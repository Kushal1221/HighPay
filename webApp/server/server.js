require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDb = require("./utils/db")
const router = require("./routes/appRoutes")

const corsOptions = {
    origin: 'http://localhost:4000', 
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions))
app.use(express.json());
app.use("/",router)


const port = 5000;

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}` );
    })
});