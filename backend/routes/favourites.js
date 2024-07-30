const express = require('express');
const { addFavorite, removeFavorite, getFavoritesByUserId } = require('../controllers/favourites');
const router = express.Router();

router.post('/addfavroutie', addFavorite);
router.post('/removefavroutie', removeFavorite);
router.get('/getfavorites/:userId', getFavoritesByUserId);

module.exports = router;
