const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Schema = require('./graphql/schema/index.js')
const Resolver = require('./graphql/resolvers/index.js')
const auth = require('./Auth/auth.js')

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
app.use(auth)

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: Resolver,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://Nasser123:${process.env.MONGO_PASSWORD}@cluster0.5n80y.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(5000, () => {
            console.log(`Server started on port`);
        });
    }).catch(err => {
        console.log(err)
    })