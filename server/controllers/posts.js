const fetch = require("node-fetch");

const { addPostAction, verifyGrecaptcha } = require("../../common/grecaptcha");

const secret = process.env.GRECAPTCHA_SECRET_KEY;
const score = parseInt(process.env.GRECAPTCHA_SCORE || 85) / 100;

// Require Post model in our routes module
let Post = require('../models/posts');

// Defined store route
const addPosts = async (req, res) => {
    const { grecaptcha, action } = req.body;
    if (action === addPostAction && !!grecaptcha) {
        const verifyError = await verifyGrecaptcha(fetch, secret, score, addPostAction, grecaptcha);
        if (verifyError.valid) {
            let post = new Post(req.body);
            try {
                await post.save();
                res.status(200).json({ 'business': 'business in added successfully' });
            } catch (e) {
                res.status(500).send("unable to save to database");
            }
        } else {
            res.json({
                "errorKey": "recaptcha-error",
                "error": verifyError.error.message || "unknown"
            });
        }
    } else {
        res.json({
            "errorKey": "missing-recaptcha"
        });
    }
    // post.save()
    //     .then(() => {
    //         res.status(200).json({ 'business': 'business in added successfully' });
    //     })
    //     .catch(() => {
    //         res.status(400).send("unable to save to database");
    //     });
}

// Defined get data(index or listing) route
const getAllPosts = function (req, res) {
    Post.paginate({}, {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    }, function (err, posts) {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.json(posts);
        }
    });
    // Post.find(function (err, posts) {
    //     if (err) {
    //         res.status(500).json(err);
    //     }
    //     else {
    //         res.json(posts);
    //     }
    // });
}

// Defined edit route
const getPostsById = function (req, res) {
    let id = req.params.id;
    Post.findById(id, function (err, post) {
        if (err) {
            res.status(500).json(err);
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
                    res.status(500).send("unable to update the database");
                });
        }
    });
}

// Defined delete | remove | destroy route
const deletePostsById = function (req, res) {
    Post.findByIdAndRemove({ _id: req.params.id }, function (err) {
        if (err) res.status(500).json(err);
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
