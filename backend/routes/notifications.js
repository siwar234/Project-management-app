const express = require('express');
const { getNotifications, markAsRead, markAllAsRead } = require('../controllers/notification');
const router = express.Router();

router.get('/user/:userId', getNotifications);
router.patch('/:id/read', markAsRead);
// router.get('/tiketResponsible/:userId', getTicketNotification);
router.put('/readall/:userId', markAllAsRead);

module.exports = router;
