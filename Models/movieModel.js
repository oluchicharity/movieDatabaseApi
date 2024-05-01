const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    releaseDate: { type: Date },
    genre: { type: String },
    cast: [{ type: String }],
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
});

const movieModel = mongoose.model('Movie', movieSchema);

module.exports = movieModel;
