
// Require Post model in our routes module
let Post = require('../models/posts');

// Defined store route
const addPosts = function (req, res) {
    let post = new Post(req.body);
    post.save()
        .then(() => {
            res.status(200).json({ 'business': 'business in added successfully' });
        })
        .catch(() => {
            res.status(400).send("unable to save to database");
        });
}

// Defined get data(index or listing) route
const getAllPosts = function (req, res) {
    Post.paginate({}, {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    }, function (err, posts) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(posts);
        }
    });
}

// Defined edit route
const getPostsById = function (req, res) {
    let id = req.params.id;
    Post.findById(id, function (err, post) {
        if (err) {
            res.json(err);
        }
        res.json(post);
    });
}

//  Defined update route
const updatePostsById = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (!post)
            res.status(404).send("data is not found");
        else {
            post.title = req.body.title;
            post.body = req.body.body;
            post.save().then(() => {
                res.json('Update complete');
            })
                .catch(() => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
}

// Defined delete | remove | destroy route
const deletePostsById = function (req, res) {
    Post.findByIdAndRemove({ _id: req.params.id }, function (err) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
}


module.exports = {
    addPosts,
    getAllPosts,
    getPostsById,
    updatePostsById,
    deletePostsById
}