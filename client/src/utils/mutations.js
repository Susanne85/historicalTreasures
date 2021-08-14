import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email:String!,$password:String!){
  login(email:$email,password:$password){
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_USER = gql`
 mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
 `;

export const SAVE_ITEM = gql`
mutation saveItem($email:String!,$itemData:ItemInput!) {
  saveItem(email:$email, itemData:$itemData) {
    _id
    username
    email
    savedItems {
      accessionId
      name
      description
  	}
	}
}
`;

export const REMOVE_ITEM = gql`
mutation removeItem($email:String!,$itemId:String!){
  removeItem(email:$email,itemId:$itemId){
    _id
    username
    email
    savedItems{
      _id
      accessionId
      name
      description
    }
  }
}
`;

export const CREATE_PEOPLE = gql`
mutation CreatePeopleMutation($createPeopleInput: [PersonCreateInput!]!) {
  createPeople(input: $createPeopleInput) {
    people {
      accessionId
      name
      surname
      born
      died
    }
  }
}
`;