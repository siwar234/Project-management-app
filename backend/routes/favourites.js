const express = require('express');
const { addFavorite, removeFavorite, getFavoritesByUserId } = require('../controllers/Favourites');
const router = express.Router();

router.post('/addfavroutie', addFavorite);
router.post('/removefavroutie', removeFavorite);
router.get('/getfavorites/:userId', getFavoritesByUserId);

module.exports = router;
