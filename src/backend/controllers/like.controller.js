
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Notification = require('../models/Notification');

// @desc    Like a post
// @route   POST /api/likes/post/:postId
// @access  Private
exports.likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({
        error: true,
        message: 'Post not found'
      });
    }
    
    // Check if post has already been liked
    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({
        error: true,
        message: 'Post already liked'
      });
    }
    
    // Add user to likes array
    post.likes.push(req.user.id);
    await post.save();
    
    // Create notification if post owner is not the liker
    if (post.user.toString() !== req.user.id) {
      await Notification.create({
        recipient: post.user,
        sender: req.user.id,
        type: 'like',
        post: post._id,
        message: `${req.user.username} liked your post`
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        likesCount: post.likes.length
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Unlike a post
// @route   DELETE /api/likes/post/:postId
// @access  Private
exports.unlikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({
        error: true,
        message: 'Post not found'
      });
    }
    
    // Check if post has been liked
    if (!post.likes.includes(req.user.id)) {
      return res.status(400).json({
        error: true,
        message: 'Post has not been liked'
      });
    }
    
    // Remove user from likes array
    post.likes = post.likes.filter(
      like => like.toString() !== req.user.id
    );
    await post.save();
    
    res.status(200).json({
      success: true,
      data: {
        likesCount: post.likes.length
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get post likes
// @route   GET /api/likes/post/:postId
// @access  Private
exports.getPostLikes = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate({
        path: 'likes',
        select: 'username firstName lastName profilePicture'
      });
    
    if (!post) {
      return res.status(404).json({
        error: true,
        message: 'Post not found'
      });
    }
    
    res.status(200).json({
      success: true,
      count: post.likes.length,
      data: post.likes
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Like a comment
// @route   POST /api/likes/comment/:commentId
// @access  Private
exports.likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    
    if (!comment) {
      return res.status(404).json({
        error: true,
        message: 'Comment not found'
      });
    }
    
    // Check if comment has already been liked
    if (comment.likes.includes(req.user.id)) {
      return res.status(400).json({
        error: true,
        message: 'Comment already liked'
      });
    }
    
    // Add user to likes array
    comment.likes.push(req.user.id);
    await comment.save();
    
    // Create notification if comment owner is not the liker
    if (comment.user.toString() !== req.user.id) {
      await Notification.create({
        recipient: comment.user,
        sender: req.user.id,
        type: 'like',
        post: comment.post,
        comment: comment._id,
        message: `${req.user.username} liked your comment`
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        likesCount: comment.likes.length
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Unlike a comment
// @route   DELETE /api/likes/comment/:commentId
// @access  Private
exports.unlikeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    
    if (!comment) {
      return res.status(404).json({
        error: true,
        message: 'Comment not found'
      });
    }
    
    // Check if comment has been liked
    if (!comment.likes.includes(req.user.id)) {
      return res.status(400).json({
        error: true,
        message: 'Comment has not been liked'
      });
    }
    
    // Remove user from likes array
    comment.likes = comment.likes.filter(
      like => like.toString() !== req.user.id
    );
    await comment.save();
    
    res.status(200).json({
      success: true,
      data: {
        likesCount: comment.likes.length
      }
    });
  } catch (err) {
    next(err);
  }
};
