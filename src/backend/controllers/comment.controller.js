
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');
const Notification = require('../models/Notification');

// @desc    Get comments for a post
// @route   GET /api/comments/post/:postId
// @access  Private
exports.getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ 
      post: req.params.postId,
      parent: null // Only get top-level comments
    })
    .populate({
      path: 'user',
      select: 'username firstName lastName profilePicture'
    })
    .populate({
      path: 'replies',
      populate: {
        path: 'user',
        select: 'username firstName lastName profilePicture'
      }
    })
    .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments.map(comment => ({
        ...comment._doc,
        isLiked: comment.likes.includes(req.user.id),
        likesCount: comment.likes.length
      }))
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create comment
// @route   POST /api/comments
// @access  Private
exports.createComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.body.post);
    
    if (!post) {
      return res.status(404).json({
        error: true,
        message: 'Post not found'
      });
    }
    
    // Add user to comment
    req.body.user = req.user.id;
    
    const comment = await Comment.create(req.body);
    
    // Populate the user field for the response
    const populatedComment = await Comment.findById(comment._id)
      .populate({
        path: 'user',
        select: 'username firstName lastName profilePicture'
      });
    
    // Create notification for post owner if not the commenter
    if (post.user.toString() !== req.user.id) {
      await Notification.create({
        recipient: post.user,
        sender: req.user.id,
        type: 'comment',
        post: post._id,
        comment: comment._id,
        message: `${req.user.username} commented on your post`
      });
    }
    
    res.status(201).json({
      success: true,
      data: {
        ...populatedComment._doc,
        isLiked: false,
        likesCount: 0
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
exports.updateComment = async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({
        error: true,
        message: 'Comment not found'
      });
    }
    
    // Make sure user is comment owner
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to update this comment'
      });
    }
    
    // Only allow content to be updated
    comment.content = req.body.content;
    await comment.save();
    
    // Repopulate for response
    comment = await Comment.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'username firstName lastName profilePicture'
      });
    
    res.status(200).json({
      success: true,
      data: {
        ...comment._doc,
        isLiked: comment.likes.includes(req.user.id),
        likesCount: comment.likes.length
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({
        error: true,
        message: 'Comment not found'
      });
    }
    
    // Make sure user is comment owner or post owner
    const post = await Post.findById(comment.post);
    
    if (comment.user.toString() !== req.user.id && 
        post.user.toString() !== req.user.id) {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to delete this comment'
      });
    }
    
    // Delete all replies to this comment if it's a parent
    if (comment.parent === null) {
      await Comment.deleteMany({ parent: comment._id });
    }
    
    // Delete notifications related to this comment
    await Notification.deleteMany({ comment: comment._id });
    
    await comment.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Reply to comment
// @route   POST /api/comments/:id/reply
// @access  Private
exports.replyToComment = async (req, res, next) => {
  try {
    const parentComment = await Comment.findById(req.params.id);
    
    if (!parentComment) {
      return res.status(404).json({
        error: true,
        message: 'Parent comment not found'
      });
    }
    
    // Create reply
    const reply = await Comment.create({
      user: req.user.id,
      post: parentComment.post,
      content: req.body.content,
      parent: parentComment._id
    });
    
    // Populate the reply
    const populatedReply = await Comment.findById(reply._id)
      .populate({
        path: 'user',
        select: 'username firstName lastName profilePicture'
      });
    
    // Create notification for comment owner if not the replier
    if (parentComment.user.toString() !== req.user.id) {
      await Notification.create({
        recipient: parentComment.user,
        sender: req.user.id,
        type: 'comment',
        post: parentComment.post,
        comment: reply._id,
        message: `${req.user.username} replied to your comment`
      });
    }
    
    res.status(201).json({
      success: true,
      data: {
        ...populatedReply._doc,
        isLiked: false,
        likesCount: 0
      }
    });
  } catch (err) {
    next(err);
  }
};
