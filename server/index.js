import "./config/config.js";
import express from "express";
import cors from "cors";

import connectDB from "./db/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

const PORT = process.env.PORT;

const app = express();

//middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

// test route
app.get("/", async (req, res) => {
    res.send("Hello from the Server!");
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGO_URL);
        app.listen(PORT, () => console.log("Server ist listening on PORT: ", PORT));
    } catch (error) {
        console.error(error);
    }
};

startServer();