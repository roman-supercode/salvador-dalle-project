import express from "express";
import "../config/config.js";
import { v2 as cloudinary } from "cloudinary";

import Post from "../models/post.js";


const router = express.Router();

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET ALL POSTS
router.route("/").get(async (_, res) => {
    try {
        const posts = await Post.find({});

        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }

});

// CREATE A POST
router.route("/").post(async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        // console.log(photo);
        // console.log(req.body);

        // Hochladen des Fotos zu Cloudinary
        const photoUrl = await cloudinary.uploader.upload(photo);

        // erstelle einen neuen Post in der Datenbank
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url
        });

        res.status(201).json({ success: true, data: newPost });

    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

export default router;
