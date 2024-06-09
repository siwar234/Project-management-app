const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const FavoritesSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: 'User' },
  ticketId: { type: ObjectId, ref: 'Tickets' },
});

module.exports = mongoose.model("Favorites", FavoritesSchema);
