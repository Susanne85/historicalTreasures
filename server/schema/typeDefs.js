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
    accessionId:String!
    name:String!
    surname:String!
    born:String 
    died:String
}

type Place {
    accessionId:String!
    name:String!
    description:String!
    dateBuilt:String 
}
type LivedIn {
    startDate:String!
    endDate:String!
}

type BuriedIn {
    burialDate:String!
}

type Married {
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