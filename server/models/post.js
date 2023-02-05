import mongoose from 'mongoose';

// Definiere das Schema für einen Beitrag
const Post = new mongoose.Schema({
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    photo: { type: String, required: true },
});

// Erstelle das Modell aus dem genannten Schema
const PostSchema = mongoose.model('Post', Post);

export default PostSchema;