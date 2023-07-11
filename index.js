const express = require('express');
require('dotenv').config();

const app = express();
const port = 3001;

app.get("/", (req, res) => {
    res.send("Hello Coffeed!");
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));