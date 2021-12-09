
const Blog = require('../../models/event.js')
const User = require('../../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { findOneAndUpdate } = require('../../models/event.js');

module.exports = {
    blogs: () => {
        return Blog.find()
            .then(blogs => {
                return blogs.map(blog => {
                    return { ...blog._doc, _id: blog.id }
                })
            })
            .catch(err => {
                throw err
            })

    },
    users: () => {
        return User.find()
            .then(users => {
                return users.map(user => {
                    return { ...user._doc, _id: user.id }
                })
            })
            .catch(err => {
                throw err
            })

    },
    createBlog: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Please login first')
        }
        console.log(req.userId)
        const blog = new Blog({
            title: args.blogInput.title,
            content: args.blogInput.content,
            author: args.blogInput.author
        })
        let createdBlogs;
        try {
            const result = await blog.save();
            createdBlogs = { ...result._doc }
            const author = await User.findById(req.userId);
            console.log(author)
            if (!author) {
                throw new Error('User not found.');
            }
            author.createdBlogs.push(blog);
            await author.save();

            return createdBlogs;
        } catch (err) {

            console.log("lmao");
            throw err;
        }
    },
    updateBlog: async args => {
        const update = await Blog.findOneAndUpdate((
            { "title": args.blogInput.title },
            { $set: { "content": args.blogInput.content } }
        ))
        const blog = new Blog({
            title: args.blogInput.title,
            content: args.blogInput.content,
            author: args.blogInput.author
        })
        let createdBlogs;
        try {
            const result = await blog.save();
            createdBlogs = { ...result._doc }
            return createdBlogs;
        } catch (err) {

            console.log("lmao");
            throw err;
        }
    },
    deleteBlog: async args => {
        const deleteb = await Blog.findOneAndRemove((
            { "title": args.blogD.title }
        ))
        const blog = new Blog({
            title: args.blogD.title,
        })
        let createdBlogs;
        try {
            return ("blog gone");
        } catch (err) {

            console.log("lmao");
            throw err;
        }
    },


    createUser: async args => {
        try {
            const existingUser = await User.findOne({ username: args.userInput.username });
            if (existingUser) {
                throw new Error('User exists already.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new User({
                username: args.userInput.username,
                password: hashedPassword
            });

            const result = await user.save();

            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    },
    login: async ({ username, password }) => {
        const user = await User.findOne({ username: username });
        if (!user) {
            throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            'secertkeybro',
            {
                expiresIn: '1h'
            }
        );
        return { userId: user.id, token: token, tokenExp: 1 };
    }
};


// { 
//     "query":"query{login(username:\"ahmed\", password:\"123\"){token} }"

// }


// { 
//     "query":"mutation{createBlog(blogInput:{title:\"hi\", content:\"baaa\") }"

// }


// mutation
// {
//   updateBlog(blogInput:{title:"broo", content:"my name is bader", author:"nasser"}){
//     title
//     content
//   }
// }
