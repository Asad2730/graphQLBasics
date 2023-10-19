const graphql = require('graphql')
var _ = require('lodash');
const Author = require('../models/author')
const Post = require('../models/post')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList
} = graphql;


const posts = [
    {
       id:0,
       title:'Test 1',
       author:'author 1'
    },
    {
        id:1,
        title:'Test 2',
        author:'author 2'
    }
]

const authors = [
    {
        id:0,
        name:'author 1',
        description:'some desc'
    },
    {
        id:1,
        name:'author 2',
        description:'some desc'
    }
]



const postType = new GraphQLObjectType({
    name:'posts',
    fields: () => ({
        id : { type : GraphQLInt },
        title : { type : GraphQLString },
        author : {type : GraphQLString },
        author_data : {
            type : authorType,
            resolve : (parent,args) => {
                return _.find( authors, (author)=> {
                    if ( author.name === parent.author ) {
                       return author;
                   } 
                })
            },
        }
    })
})


const authorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id : {type:GraphQLInt},
        name : {type:GraphQLString},
        posts:{
            type:new GraphQLList(postType),
            resolve(parent,args){
                var author_post = []
                 _.find(posts, (post) => {
                    if(post.author === parent.name) {
                        author_post.push( post )
                    }
                })

                return author_post
            }
        }
    })
})



const mutation =  new GraphQLObjectType({
    name : 'Mutation',
    fields : {
         addPost: {
            type : postType,
            args : {
                id : { type : GraphQLInt },
                title : { type : GraphQLString },
                author : { type : GraphQLString },                
            },
            resolve(parent,args){
                let new_post = new Post({
                    id : args.id,
                    author : args.author,
                    title : args.title,
                })

                return  new_post.save();
            },
         },
         addAuthor : {
            type : authorType,
            args : {
                id : { type : GraphQLInt },
                name : { type : GraphQLString },
                description : { type : GraphQLString },    
            },
            resolve(parent,args){
                let new_author = new Author({
                    id : args.id,
                    name : args.name,
                    description : args.description,
                })

                return new_author.save()
            }
        }
    }
})

const rootQuery = new GraphQLObjectType({

    name:'RootQuery',
    fields:{
        authors:{
            type : new GraphQLList(authorType),
            resolve (parent,args){
                return Author.find({})
            }
        },
        posts:{
            type:new GraphQLList(postType),
            resolve (parent,args){
                return Post.find({})
            }
        },
        post : {
            type : postType,
            args:{id:{ type : GraphQLInt }},
            resolve (parent,args){
               return  Post.findById(args.id)   
            }
        },
        author : {
            type : authorType,
            args : {id : { type:GraphQLInt }},
            resolve (parent,args){
                return Author.findById(args.id)
            }
        }
    }
})






module.exports = new GraphQLSchema({
    query : rootQuery,
    mutation: mutation,
})



