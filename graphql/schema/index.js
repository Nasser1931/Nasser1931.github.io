const { buildSchema } = require('graphql')



module.exports = buildSchema(`
type Blog {
    _id: ID!
    title: String!
    content: String
    author: String

},

type User {
    _id: ID!
    username: String!
    password: String
},

type AuthData {
    userId: ID!
    token: String!
    tokenExp: Int!
},

input UserInput {
    username: String!
    password: String!
    
},
input BlogInput {
    title: String!
    content: String!
    author: String!
}
input BlogD{
    title: String!
}
type RootQuery {
    blogs: [Blog!]!
    users: [User!]!
    login(username: String!, password: String!): AuthData!
},

type RootMutation {
    createBlog(blogInput: BlogInput): Blog
    createUser(userInput: UserInput): User
    updateBlog(blogInput: BlogInput): Blog
    deleteBlog(blogD: BlogD): Blog
},

schema {
    query: RootQuery
    mutation: RootMutation
}
`)