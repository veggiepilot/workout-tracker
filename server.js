require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
    console.log('connect to database')
});

// Routes
app.use(require("./routes/api.js"));


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));