const express = require('express')
const mongoose = require('mongoose');
var { graphqlHTTP } = require("express-graphql")
const app = express()
const port = 4000

const schema = require('./schema/model')

mongoose.connect('mongodb://localhost:27017/your-database-name')
mongoose.connection.once('open',() => {
    console.log('connected to db')
})

app.get('/',(req,res)=>{
    res.send('Welcome to GraphQL App')
})


app.use('/graphQl',graphqlHTTP({
    schema,
    graphiql:true,
}))

app.listen(port,()=>{
    console.log('GraphQL running on port:',port)
})