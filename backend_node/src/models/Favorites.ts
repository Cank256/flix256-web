// models/Favorites.js
import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  media: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', FavoriteSchema);
