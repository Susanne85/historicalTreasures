import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns, Alert} from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

import { GET_PEOPLE, GET_PLACE} from '../utils/queries';
const SearchBooks = () => {
  
  const [searchInput, setSearchInput] = useState({
    searchPerson: '',
    searchPlace: '',
  });
  const [searchedItems, setSearchedItems] = useState([]);
  const { error, loading, data: userData } = useQuery(GET_PEOPLE);
  const { errorPlace, loadingPlace, data: placeData } = useQuery(GET_PLACE);
  const [showAlert, setShowAlert] = useState(false);
  console.log('people', userData);
  console.log('place', placeData);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    if (searchInput.searchPerson !== '' && searchInput.searchPlace !== '') {
      setShowAlert(true);
    }

    try {
  
      // Here is where we need to do send off a query request
      if (searchInput.searchPerson !== ''){
          // send off a query for search Person graphql query
      }else {
          // send off a query for search Place
      }
      const itemData = userData.people.map((item) => ({
        accessionID: item.accessionID,
        name: item.name,
        surname:item.surname,
        born: item.born,
        died: item.died,
        place: item.place
      }));

      setSearchedItems(itemData);

      setSearchInput({
        searchPerson: '',
        searchPlace: '',
      });

    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for a Person or Place</h1>
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Only Person or Place can be searched!
          </Alert>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchPerson'
                  value={searchInput.searchPerson}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Enter name of Person'
                />
                <br></br>
                <Form.Control
                  name='searchInput'
                  value={searchInput.searchPlace}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Enter name of Place'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <CardColumns>
          {searchedItems.map((item) => {
            return (
              <Card key={item.itemId} border='dark'>
                <Card.Body>
                  <Card.Title>{item.name} {item.surname}</Card.Title>
                  <p className='small'>Born: {item.born}</p>
                  <p className='small'>Died: {item.died}</p>
                  <Card.Text>{item.place}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchBooks;
