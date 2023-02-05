import "../config/config.js";
import express from "express";
import { Configuration, OpenAIApi } from "openai";


const router = express.Router();

// https://beta.openai.com/docs/libraries/node-js-library
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

// eine neu Instanz der OpenAIApi
const openai = new OpenAIApi(configuration);

router.route("/").post(async (req, res) => {
    try {
        const { prompt } = req.body;

        // Anfrage an die OpenAI-API
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });

        // Antwort (Bild) auslesen
        const image = aiResponse.data.data[0].b64_json;

        // Bild wird an den Client zurückgegeben
        res.status(200).json({ photo: image });

    } catch (error) {
        console.error(error);
        // Fehlermeldung wird an den Client gesendet
        res.status(500).send(error?.response.data.error.message);
    }
});

export default router;