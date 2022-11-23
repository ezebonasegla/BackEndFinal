const mongoose = require('mongoose');

const URL = 'mongodb+srv://Coder:F7HqDRbId1K2uHSv@cluster0.p7xqr5d.mongodb.net/test';

const connection = mongoose.connect(URL, {
    useNewUrlParser: true
});

module.exports = connection;