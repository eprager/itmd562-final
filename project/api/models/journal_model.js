const mongoose = require('mongoose');

const journalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    p1: String,
    p2: String,
    p3: String,
    p4: String,
    p5: String,
    p6: String,
    mood: String,
    date: Date
});

module.exports = mongoose.model('Journal', journalSchema);
