const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const path = require('path');

require('dotenv').config();

const ingestorRoutes = require('./routes/ingestor');

const adminRoutes = require('./routes/admin');

const mongoose = require('mongoose');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(ingestorRoutes);

app.use(adminRoutes);

app.use((req, res) => {
    const url = req.url;
    res.sendFile(path.join(__dirname, `public/${url}`));
})

mongoose.connect(process.env.URI)
.then(() => {
    console.log("Connected at localhost on port 3000");
    app.listen(process.env.PORT);
})
.catch(err => console.log(err));

