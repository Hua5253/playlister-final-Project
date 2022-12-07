const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        isPublished: { type: Boolean, required: true },
        publishedDate: {type: String, required: false},
        likes: {type: Number, default: 0, required: false},
        dislikes: {type: Number, default: 0, required: false},
        listens: {type: Number, required: false},
        comments: {type: [{userName: String, comment: String}], required: false},
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        userName: {type: String, required: true},
        songs: {
            type: [{
                title: String,
                artist: String,
                youTubeId: String
            }], required: true
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
