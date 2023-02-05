import mongoose from "mongoose";

const connectDB = (url) => {
    // https://mongoosejs.com/docs/guide.html#strictQuery
    // aktiviert die strenge Überprüfung von Abfragen in Mongoose.
    mongoose.set('strictQuery', true);

    // Verbindung zur angegebenen URL herstellen
    mongoose.connect(url)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => {
            console.error('failed to connect with mongo', err);
        });
};

export default connectDB;