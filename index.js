const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

require("dotenv").config();

const Database= require('./Config/config')

const Port = process.env.PORT || 1234;

app.listen(Port, () => {
    console.log(`This Application is listening on port ${Port}`);
});

