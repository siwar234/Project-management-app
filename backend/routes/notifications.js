const express = require('express');
const { getNotifications, markAsRead } = require('../controllers/notification');
const router = express.Router();

router.get('/user/:userId', getNotifications);
router.patch('/:id/read', markAsRead);
// router.get('/tiketResponsible/:userId', getTicketNotification);

module.exports = router;
