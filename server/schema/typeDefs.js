const { gql } = require('apollo-server-express')

const typeDefs = gql`
type Query{
    me(email:String!):User
    getPeople:[Person]
    getPlace:[Place]
}

type Item {
    _id:ID!
    accessionId:String!
    name:String!
    description:String
}

type User {
    _id:ID!
    username:String!
    email:String!
    savedItems: [Item]
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
}

type Place {
    _id:ID!
    accessionId:String!
    name:String!
    description:String!
    dateBuilt:String 
}
type LivedIn {
    _id:ID!
    startDate:String!
    endDate:String!
}

type BuriedIn {
    _id:ID!
    burialDate:String!
}

type Married {
    _id:ID!
    marriageDate:String!
}

input ItemInput {
    accessionId: String!
    name:String!
    description:String
}

type Mutation{
    login(email:String!, password:String! ):Auth
    addUser(username:String!, email:String!, password:String!):Auth
    saveItem(email:String!,itemData:ItemInput!):User!
    removeItem(email:String!,itemId:String!):User!
    
} 

`;

module.exports = typeDefs;