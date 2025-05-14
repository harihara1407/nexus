
const Friend = require('../models/Friend');
const User = require('../models/User');
const Notification = require('../models/Notification');
const mongoose = require('mongoose');

// @desc    Get user's friends
// @route   GET /api/friends
// @access  Private
exports.getFriends = async (req, res, next) => {
  try {
    // Find all accepted friendships where user is either requester or recipient
    const friendships = await Friend.find({
      $or: [
        { requester: req.user.id, status: 'accepted' },
        { recipient: req.user.id, status: 'accepted' }
      ]
    }).populate({
      path: 'requester recipient',
      select: 'username firstName lastName profilePicture'
    });
    
    // Format the response to extract just the friends
    const friends = friendships.map(friendship => {
      const isFriendRequester = friendship.requester._id.toString() !== req.user.id;
      return {
        friendship: {
          id: friendship._id,
          since: friendship.updatedAt
        },
        user: isFriendRequester ? friendship.requester : friendship.recipient
      };
    });
    
    res.status(200).json({
      success: true,
      count: friends.length,
      data: friends
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user's friend requests
// @route   GET /api/friends/requests
// @access  Private
exports.getFriendRequests = async (req, res, next) => {
  try {
    // Find all pending friendships where user is the recipient
    const friendRequests = await Friend.find({
      recipient: req.user.id,
      status: 'pending'
    }).populate({
      path: 'requester',
      select: 'username firstName lastName profilePicture'
    });
    
    res.status(200).json({
      success: true,
      count: friendRequests.length,
      data: friendRequests
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Send friend request
// @route   POST /api/friends/request/:userId
// @access  Private
exports.sendFriendRequest = async (req, res, next) => {
  try {
    const recipient = await User.findById(req.params.userId);
    
    if (!recipient) {
      return res.status(404).json({
        error: true,
        message: 'User not found'
      });
    }
    
    // Check if recipient is the requester
    if (recipient._id.toString() === req.user.id) {
      return res.status(400).json({
        error: true,
        message: 'You cannot send a friend request to yourself'
      });
    }
    
    // Check if friend request already exists
    const existingRequest = await Friend.findOne({
      $or: [
        { requester: req.user.id, recipient: recipient._id },
        { requester: recipient._id, recipient: req.user.id }
      ]
    });
    
    if (existingRequest) {
      return res.status(400).json({
        error: true,
        message: 'A friend request already exists between these users'
      });
    }
    
    // Create friend request
    const friendRequest = await Friend.create({
      requester: req.user.id,
      recipient: recipient._id
    });
    
    // Create notification for recipient
    await Notification.create({
      recipient: recipient._id,
      sender: req.user.id,
      type: 'friend_request',
      message: `${req.user.username} sent you a friend request`
    });
    
    // Populate the requester for response
    const populatedRequest = await Friend.findById(friendRequest._id)
      .populate({
        path: 'requester',
        select: 'username firstName lastName profilePicture'
      });
    
    res.status(201).json({
      success: true,
      data: populatedRequest
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Accept friend request
// @route   PUT /api/friends/request/:requestId/accept
// @access  Private
exports.acceptFriendRequest = async (req, res, next) => {
  try {
    const friendRequest = await Friend.findById(req.params.requestId);
    
    if (!friendRequest) {
      return res.status(404).json({
        error: true,
        message: 'Friend request not found'
      });
    }
    
    // Check if user is the recipient of the request
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to accept this request'
      });
    }
    
    // Check if request is pending
    if (friendRequest.status !== 'pending') {
      return res.status(400).json({
        error: true,
        message: `Friend request already ${friendRequest.status}`
      });
    }
    
    // Update friend request status
    friendRequest.status = 'accepted';
    await friendRequest.save();
    
    // Create notification for requester
    await Notification.create({
      recipient: friendRequest.requester,
      sender: req.user.id,
      type: 'friend_accept',
      message: `${req.user.username} accepted your friend request`
    });
    
    // Populate the friend request for response
    const populatedRequest = await Friend.findById(friendRequest._id)
      .populate({
        path: 'requester recipient',
        select: 'username firstName lastName profilePicture'
      });
    
    res.status(200).json({
      success: true,
      data: populatedRequest
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Reject friend request
// @route   PUT /api/friends/request/:requestId/reject
// @access  Private
exports.rejectFriendRequest = async (req, res, next) => {
  try {
    const friendRequest = await Friend.findById(req.params.requestId);
    
    if (!friendRequest) {
      return res.status(404).json({
        error: true,
        message: 'Friend request not found'
      });
    }
    
    // Check if user is the recipient of the request
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to reject this request'
      });
    }
    
    // Check if request is pending
    if (friendRequest.status !== 'pending') {
      return res.status(400).json({
        error: true,
        message: `Friend request already ${friendRequest.status}`
      });
    }
    
    // Update friend request status
    friendRequest.status = 'rejected';
    await friendRequest.save();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Remove friend
// @route   DELETE /api/friends/:friendId
// @access  Private
exports.removeFriend = async (req, res, next) => {
  try {
    // Find the friendship
    const friendship = await Friend.findOne({
      $or: [
        { requester: req.user.id, recipient: req.params.friendId, status: 'accepted' },
        { requester: req.params.friendId, recipient: req.user.id, status: 'accepted' }
      ]
    });
    
    if (!friendship) {
      return res.status(404).json({
        error: true,
        message: 'Friendship not found'
      });
    }
    
    await friendship.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get friend suggestions
// @route   GET /api/friends/suggestions
// @access  Private
exports.getFriendSuggestions = async (req, res, next) => {
  try {
    // Get current user's friends
    const friendships = await Friend.find({
      $or: [
        { requester: req.user.id, status: 'accepted' },
        { recipient: req.user.id, status: 'accepted' }
      ]
    });
    
    const friendIds = friendships.map(friendship => 
      friendship.requester.toString() === req.user.id 
        ? friendship.recipient 
        : friendship.requester
    );
    
    // Also exclude users that have pending requests
    const pendingRequests = await Friend.find({
      $or: [
        { requester: req.user.id, status: 'pending' },
        { recipient: req.user.id, status: 'pending' }
      ]
    });
    
    const pendingIds = pendingRequests.map(request => 
      request.requester.toString() === req.user.id 
        ? request.recipient 
        : request.requester
    );
    
    // Combine ids to exclude
    const excludeIds = [...friendIds, ...pendingIds, req.user.id];
    
    // Find users not in the exclude list - limit to 5
    const suggestions = await User.find({
      _id: { $nin: excludeIds }
    })
    .select('username firstName lastName profilePicture')
    .limit(5);
    
    res.status(200).json({
      success: true,
      count: suggestions.length,
      data: suggestions
    });
  } catch (err) {
    next(err);
  }
};
