const mongoose = require('mongoose');
const p = require(`${__dirname}/password.js`);


mongoose.connect(`mongodb+srv://admin:${p.password}@rocketdb-kfgku.mongodb.net/toDo?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const postSchema = new mongoose.Schema({
    post: String
});

const Post = mongoose.model('post', postSchema);

exports.loadPosts = function () {
    return new Promise(async (resolve, reject) => {
        const postArray = [];

        await Post.find({}, (err, data) => {
            if (data) {
                data.forEach(e => postArray.push(e));
            }
        });

        resolve(postArray);
    });
}

exports.newItem = function (item) {
    const post = new Post({ post: item });
    post.validate;
    post.save();
}

exports.deleteItem = function (post) {
    Post.deleteOne({ _id: post }, (err) => {
        if (err) {
            console.log(err);
        }
    });
}