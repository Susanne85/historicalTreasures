const { gql } = require('apollo-server-express')

const typeDefs = gql`
type Query{
    me:User
    getPeople:[People]
    getPlace:[Place]
}

type User {
    _id:ID!
    username:String!
    email:String!
    savedPlace: [Place]
    savedPerson: [People]
}

type Auth{
    token:String!
    user:User
}
type People {
    _id:ID!
    accessionId:String!
    name:String!
    surname:String!
    born:String 
    died:String
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