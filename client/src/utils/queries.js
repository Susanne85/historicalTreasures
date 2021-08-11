import { gql } from '@apollo/client';

export const GET_ME = gql`
query getMe{
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        bookId
        authors
        title
        description
        image
        link
      }
    }
  }
`;

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