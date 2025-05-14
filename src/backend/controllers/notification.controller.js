
const Notification = require('../models/Notification');

// @desc    Get user's notifications
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;
    
    const notifications = await Notification.find({ recipient: req.user.id })
      .populate({
        path: 'sender',
        select: 'username firstName lastName profilePicture'
      })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    
    // Get total count
    const totalNotifications = await Notification.countDocuments({ recipient: req.user.id });
    
    // Pagination result
    const pagination = {
      totalPages: Math.ceil(totalNotifications / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(totalNotifications / limit),
      hasPrevPage: page > 1
    };
    
    res.status(200).json({
      success: true,
      count: notifications.length,
      pagination,
      data: notifications
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
exports.markAsRead = async (req, res, next) => {
  try {
    let notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return res.status(404).json({
        error: true,
        message: 'Notification not found'
      });
    }
    
    // Make sure notification belongs to user
    if (notification.recipient.toString() !== req.user.id) {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to update this notification'
      });
    }
    
    // Mark as read
    notification.isRead = true;
    await notification.save();
    
    res.status(200).json({
      success: true,
      data: notification
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
exports.markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, isRead: false },
      { isRead: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private
exports.deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return res.status(404).json({
        error: true,
        message: 'Notification not found'
      });
    }
    
    // Make sure notification belongs to user
    if (notification.recipient.toString() !== req.user.id) {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to delete this notification'
      });
    }
    
    await notification.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get unread notifications count
// @route   GET /api/notifications/unread-count
// @access  Private
exports.getUnreadCount = async (req, res, next) => {
  try {
    const count = await Notification.countDocuments({ 
      recipient: req.user.id,
      isRead: false
    });
    
    res.status(200).json({
      success: true,
      count
    });
  } catch (err) {
    next(err);
  }
};
