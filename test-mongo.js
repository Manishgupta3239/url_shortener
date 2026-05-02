const mongoose = require('mongoose');

const uri = "mongodb+srv://1438dummy:rHEUSPztaCvWsoeX@cluster0.q1ujojv.mongodb.net/UrlShorter?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
    .then(() => {
        console.log("SUCCESS! Database connected.");
        process.exit(0);
    })
    .catch(err => {
        console.error("CONNECTION FAILED:", err);
        process.exit(1);
    });
