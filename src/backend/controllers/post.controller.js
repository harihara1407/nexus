
const Post = require('../models/Post');
const User = require('../models/User');
const Friend = require('../models/Friend');
const Notification = require('../models/Notification');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
exports.getAllPosts = async (req, res, next) => {
  try {
    let query;
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Create query
    query = Post.find()
      .populate({
        path: 'user',
        select: 'username firstName lastName profilePicture'
      })
      .populate({
        path: 'comments',
        select: 'content user createdAt',
        options: { limit: 3 },
        populate: {
          path: 'user',
          select: 'username firstName lastName profilePicture'
        }
      })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    
    const posts = await query;
    
    // Get total count
    const totalPosts = await Post.countDocuments();
    
    // Pagination result
    const pagination = {
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(totalPosts / limit),
      hasPrevPage: page > 1
    };
    
    res.status(200).json({
      success: true,
      count: posts.length,
      pagination,
      data: posts
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user feed (posts from user and friends)
// @route   GET /api/posts/feed
// @access  Private
exports.getFeed = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Find all friends
    const friends = await Friend.find({
      $or: [
        { requester: req.user.id, status: 'accepted' },
        { recipient: req.user.id, status: 'accepted' }
      ]
    });
    
    // Get all friend IDs
    const friendIds = friends.map(friend => 
      friend.requester.toString() === req.user.id 
        ? friend.recipient 
        : friend.requester
    );
    
    // Add user's own ID to the list
    const userIds = [...friendIds, req.user.id];
    
    // Find posts from user and friends
    const posts = await Post.find({ user: { $in: userIds } })
      .populate({
        path: 'user',
        select: 'username firstName lastName profilePicture'
      })
      .populate({
        path: 'comments',
        select: 'content user createdAt',
        options: { limit: 3 },
        populate: {
          path: 'user',
          select: 'username firstName lastName profilePicture'
        }
      })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    
    // Get total count
    const totalPosts = await Post.countDocuments({ user: { $in: userIds } });
    
    // Pagination result
    const pagination = {
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(totalPosts / limit),
      hasPrevPage: page > 1
    };
    
    res.status(200).json({
      success: true,
      count: posts.length,
      pagination,
      data: posts.map(post => ({
        ...post._doc,
        isLiked: post.likes.includes(req.user.id),
        isSaved: post.saved.includes(req.user.id),
        likesCount: post.likes.length,
        commentsCount: post.comments.length
      }))
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Private
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'username firstName lastName profilePicture'
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username firstName lastName profilePicture'
        }
      });
    
    if (!post) {
      return res.status(404).json({
        error: true,
        message: 'Post not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        ...post._doc,
        isLiked: post.likes.includes(req.user.id),
        isSaved: post.saved.includes(req.user.id),
        likesCount: post.likes.length,
        commentsCount: post.comments.length
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res, next) => {
  try {
    // Add user to body
    req.body.user = req.user.id;
    
    // Handle media files
    const mediaFiles = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        mediaFiles.push(file.filename);
      });
    }
    
    // Create post
    const post = await Post.create({
      ...req.body,
      media: mediaFiles
    });
    
    // Fetch the complete post with populated user
    const newPost = await Post.findById(post._id)
      .populate({
        path: 'user',
        select: 'username firstName lastName profilePicture'
      });
    
    res.status(201).json({
      success: true,
      data: newPost
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
exports.updatePost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        error: true,
        message: 'Post not found'
      });
    }
    
    // Make sure user is post owner
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to update this post'
      });
    }
    
    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate({
      path: 'user',
      select: 'username firstName lastName profilePicture'
    });
    
    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        error: true,
        message: 'Post not found'
      });
    }
    
    // Make sure user is post owner
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to delete this post'
      });
    }
    
    // Delete media files
    if (post.media && post.media.length > 0) {
      post.media.forEach(media => {
        try {
          const mediaPath = path.join(__dirname, '../../', config.UPLOAD_PATH, media);
          if (fs.existsSync(mediaPath)) {
            fs.unlinkSync(mediaPath);
          }
        } catch (err) {
          console.error('Error deleting media file:', err);
        }
      });
    }
    
    await post.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Save post
// @route   POST /api/posts/:id/save
// @access  Private
exports.savePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        error: true,
        message: 'Post not found'
      });
    }
    
    // Check if post is already saved
    if (post.saved.includes(req.user.id)) {
      return res.status(400).json({
        error: true,
        message: 'Post already saved'
      });
    }
    
    // Add user to post's saved array
    post.saved.push(req.user.id);
    await post.save();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Unsave post
// @route   DELETE /api/posts/:id/save
// @access  Private
exports.unsavePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        error: true,
        message: 'Post not found'
      });
    }
    
    // Check if post is saved
    if (!post.saved.includes(req.user.id)) {
      return res.status(400).json({
        error: true,
        message: 'Post not saved'
      });
    }
    
    // Remove user from post's saved array
    post.saved = post.saved.filter(
      savedBy => savedBy.toString() !== req.user.id
    );
    await post.save();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get saved posts
// @route   GET /api/posts/saved
// @access  Private
exports.getSavedPosts = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Find posts that include the user's ID in the saved array
    const posts = await Post.find({ saved: req.user.id })
      .populate({
        path: 'user',
        select: 'username firstName lastName profilePicture'
      })
      .populate({
        path: 'comments',
        select: 'content user createdAt',
        options: { limit: 3 },
        populate: {
          path: 'user',
          select: 'username firstName lastName profilePicture'
        }
      })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    
    // Get total count
    const totalPosts = await Post.countDocuments({ saved: req.user.id });
    
    // Pagination result
    const pagination = {
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(totalPosts / limit),
      hasPrevPage: page > 1
    };
    
    res.status(200).json({
      success: true,
      count: posts.length,
      pagination,
      data: posts.map(post => ({
        ...post._doc,
        isLiked: post.likes.includes(req.user.id),
        isSaved: true, // Always true for saved posts
        likesCount: post.likes.length,
        commentsCount: post.comments.length
      }))
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user's posts
// @route   GET /api/posts/user/:userId
// @access  Private
exports.getUserPosts = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const posts = await Post.find({ user: req.params.userId })
      .populate({
        path: 'user',
        select: 'username firstName lastName profilePicture'
      })
      .populate({
        path: 'comments',
        select: 'content user createdAt',
        options: { limit: 3 },
        populate: {
          path: 'user',
          select: 'username firstName lastName profilePicture'
        }
      })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    
    // Get total count
    const totalPosts = await Post.countDocuments({ user: req.params.userId });
    
    // Pagination result
    const pagination = {
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(totalPosts / limit),
      hasPrevPage: page > 1
    };
    
    res.status(200).json({
      success: true,
      count: posts.length,
      pagination,
      data: posts.map(post => ({
        ...post._doc,
        isLiked: post.likes.includes(req.user.id),
        isSaved: post.saved.includes(req.user.id),
        likesCount: post.likes.length,
        commentsCount: post.comments.length
      }))
    });
  } catch (err) {
    next(err);
  }
};
