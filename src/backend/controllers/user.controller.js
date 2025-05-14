
const User = require('../models/User');
const Post = require('../models/Post');
const Friend = require('../models/Friend');
const fs = require('fs');
const path = require('path');

// @desc    Get all users
// @route   GET /api/users
// @access  Private
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-__v');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'User not found'
      });
    }

    // Check if users are friends
    const friendship = await Friend.findOne({
      $or: [
        { requester: req.user.id, recipient: user._id },
        { requester: user._id, recipient: req.user.id }
      ]
    });
    
    let friendshipStatus = null;
    if (friendship) {
      friendshipStatus = {
        id: friendship._id,
        status: friendship.status,
        since: friendship.updatedAt,
        isRequester: friendship.requester.toString() === req.user.id
      };
    }

    // Get user posts count
    const postsCount = await Post.countDocuments({ user: user._id });

    res.status(200).json({
      success: true,
      data: {
        ...user._doc,
        friendship: friendshipStatus,
        postsCount
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = async (req, res, next) => {
  try {
    // Check if user exists
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'User not found'
      });
    }

    // Make sure user is updating their own profile
    if (user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to update this user'
      });
    }

    // Create fields to update
    const fieldsToUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      location: req.body.location,
      website: req.body.website,
    };
    
    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => 
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    // Update user
    user = await User.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'User not found'
      });
    }

    // Make sure user is deleting their own account or is an admin
    if (user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to delete this user'
      });
    }

    // Delete user's posts
    await Post.deleteMany({ user: user._id });
    
    // Delete user's friendships
    await Friend.deleteMany({
      $or: [{ requester: user._id }, { recipient: user._id }]
    });

    await user.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Upload profile picture
// @route   POST /api/users/profile-picture
// @access  Private
exports.uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: 'Please upload a file'
      });
    }

    const user = await User.findById(req.user.id);

    // Delete old profile picture if it's not the default
    if (user.profilePicture !== 'default-profile.jpg') {
      try {
        const oldImagePath = path.join(__dirname, '../../', config.UPLOAD_PATH, user.profilePicture);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      } catch (err) {
        console.error('Error deleting old profile picture:', err);
      }
    }

    // Update user with new profile picture
    user.profilePicture = req.file.filename;
    await user.save();

    res.status(200).json({
      success: true,
      data: {
        profilePicture: user.profilePicture
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Search users by username or name
// @route   GET /api/users/search/:query
// @access  Private
exports.searchUsers = async (req, res, next) => {
  try {
    const query = req.params.query;
    
    if (!query) {
      return res.status(400).json({
        error: true,
        message: 'Please provide a search query'
      });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } }
      ]
    }).select('-__v').limit(10);

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user suggestions (users not friends with)
// @route   GET /api/users/suggestions
// @access  Private
exports.getUserSuggestions = async (req, res, next) => {
  try {
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
    
    // Also exclude pending requests
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
    
    // Find users not in the exclude list
    const users = await User.find({
      _id: { $nin: excludeIds }
    })
    .select('username firstName lastName profilePicture')
    .limit(5);
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
};
