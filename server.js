const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exercise", {
    useNewURLParser: true,
    useFindAndModify: false
});

// app.use(require());


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));