import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from "@apollo/client"
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import Auth from '../utils/auth';
import { removeItemId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries';
import { REMOVE_ITEM } from '../utils/mutations';
const SavedItems = () => {

  const userProfile = Auth.getProfile();

  const { error, loading, data: userData } = useQuery(GET_ME, {
    variables: { email: userProfile.data.email }
  })

  const [removeItem] = useMutation(REMOVE_ITEM);
  let itemData = [];
  if (userData) {
    itemData = userData.me.savedItems.map((item) => ({
      accessionId: item.accessionId,
      name: item.name,
      description: item.description
    }));
  }
  const getUserData = async () => {
    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }

    } catch (err) {
      console.error(err);
    }
  };

  getUserData();
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteItem = async (itemId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    console.log('here', itemId);
    try {
      const userData = await removeItem({
        variables: { email: userProfile.data.email, itemId },
      });

      // upon success, remove book's id from localStorage
      removeItemId(itemId);

    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved Items!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <CardColumns>
          {itemData.map((item) => {
            return (
              <Card key={item.accessionId} border='dark'>
                <Card.Body>
                  <Card.Title> {item.name}</Card.Title>
                  <Card.Text>Accession Id : {item.accessionId}</Card.Text>
                  <Card.Text>{item.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteItem(item.accessionId)}>
                    Delete this Item!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedItems;
