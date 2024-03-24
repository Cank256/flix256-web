// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    lang: {
        type: String,
        required: true,
    },
});

// Use ES Module export syntax
export default mongoose.model('User', UserSchema);
