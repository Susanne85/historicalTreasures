const { gql } = require('apollo-server-express')

const typeDefs = gql`
type Query{
    me:User
}

type User {
    _id:ID!
    username:String!
    email:String!
    bookCount:String
    savedBooks: [Book]
}

type Auth{
    token:String!
    user:User
}
type Person {
    _id:ID!
    accessionId:String!
    name:String!
    surname:String!
    born:String 
    died:String
    occupation:String
}

type Place {
    _id:ID!
    accessionId:String!
    name:String!
    description:String!
    dateBuilt:String 
}

type Mutation{
    login(email:String!, password:String! ):Auth
    addUser(username:String!, email:String!, password:String!):Auth
} 

`;

module.exports = typeDefs;