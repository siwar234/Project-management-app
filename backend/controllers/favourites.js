
const mongoose = require("mongoose");

const Favorites = require("../models/Favorites")

exports.addFavorite = async (req, res) => {
  try {
    const { userId, ticketId } = req.body;
    const favorite = new Favorites({ userId, ticketId });
    await favorite.save();
    
    
    res.status(200).json({ message: 'Ticket added to favorites' });
  } catch (error) {
    console.error('Error adding ticket to favorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getFavoritesByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const favorites = await Favorites.find({ userId }).populate('ticketId');
      res.status(200).json(favorites);
    } catch (error) {
      console.error('Error fetching favorites by userId:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

  

exports.removeFavorite = async (req, res) => {
  try {
    const { userId, ticketId } = req.body;
    await Favorites.deleteOne({ userId, ticketId });
    res.status(200).json({ message: 'Ticket removed from favorites' });
  } catch (error) {
    console.error('Error removing ticket from favorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
