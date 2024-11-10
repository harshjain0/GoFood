const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require("./db"); // Assuming db.js exports mongoDB function

// Middleware for handling CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const startServer = async () => {
    try {
        // Connect to MongoDB
        await mongoDB();

        console.log("Connected to MongoDB");

        // Middleware to parse JSON bodies
        app.use(express.json());

        // Define your routes
        app.get('/', (req, res) => {
            res.send('Hello World!');
        });

        // Make sure the route file exists and is properly set up
        app.use('/api', require("./Routes/CreateUser"));
        app.use('/api', require("./Routes/DisplayData"));


        // Start the server
        app.listen(port, () => {
            console.log(`App is listening on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

startServer();

