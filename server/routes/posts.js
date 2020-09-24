// post.model.js

const express = require('express');
const postRoutes = express.Router();

// Require Post model in our routes module
const { addPosts, getAllPosts, getPostsById, updatePostsById, deletePostsById } = require('../controllers/posts');

// Defined store route
postRoutes.route('/add').post(addPosts);

// Defined get data(index or listing) route
postRoutes.route('/').get(getAllPosts);

// Defined edit route
postRoutes.route('/edit/:id').get(getPostsById);

//  Defined update route
postRoutes.route('/update/:id').post(updatePostsById);

// Defined delete | remove | destroy route
postRoutes.route('/delete/:id').delete(deletePostsById);

module.exports = postRoutes;