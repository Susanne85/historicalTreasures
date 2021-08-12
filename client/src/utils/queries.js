import { gql } from '@apollo/client';

export const GET_ME = gql`
query getMe ($email:String!) {
  me(email:$email) {
    _id
    username
    email
    savedItems{
      accessionId
      name
      description
    }
  }
}`;

export const GET_PEOPLE = gql`
query getpeople {
	people {
    accessionId
    name
    surname
    born
    died
  }
}`;

export const GET_PLACE = gql`
query getPlace {
  places {
    accessionId
    name
    description
    dateBuilt
  }
}
`;