require('dotenv').config();
const express = require('express');
const app = express();
const connectDb = require("./utils/db")
const router = require("./routes/appRoutes")

app.use(express.json());
app.use("/",router)

const port = 4000;

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}` );
    })
});