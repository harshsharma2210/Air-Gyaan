// post.model.js

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Post = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    }
}, {
    collection: 'posts'
});
Post.plugin(mongoosePaginate);
module.exports = mongoose.model('Post', Post);
