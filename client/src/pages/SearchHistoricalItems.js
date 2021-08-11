import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns, Alert } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

import { GET_PEOPLE, GET_PLACE } from '../utils/queries';
const SearchHistoricalItems = () => {

  const [searchInput, setSearchInput] = useState({
    searchPerson: '',
    searchPlace: '',
  });

  const [searchedItems, setSearchedItems] = useState([]);

  const { error, loading, data: userData } = useQuery(GET_PEOPLE);

  const { errorPlace, loadingPlace, data: placeData } = useQuery(GET_PLACE);

  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newValue = value.charAt(0).toUpperCase() + value.slice(1);
    setSearchInput({ ...searchInput, [name]: newValue });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }

    if (searchInput.searchPerson !== '' && searchInput.searchPlace !== '') {
      setShowAlert(true);
      return;
    }

    let itemData = [];
    try {
      if (searchInput.searchPerson !== '') {
        itemData = userData.people.map((item) => ({
          accessionID: item.accessionID,
          name: item.name + ' ' + item.surname,
          surname: item.surname,
          born: "Born : " + item.born,
          died: "Died : " + item.died
        }));

        if (searchInput.searchPerson !== "*") {
          itemData = itemData.filter(function (item) { return item.surname === searchInput.searchPerson });
        }

      } else if (searchInput.searchPlace !== '') {
        itemData = placeData.places.map((item) => ({
          accessionID: item.accessionID,
          name: item.name,
          description: item.description,
          dateBuilt: item.dateBuilt
        }));

        if (searchInput.searchPlace !== "*") {
          itemData = itemData.filter(function (item) { return item.name === searchInput.searchPlace });
        }
      }

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
                  onChange={handleInputChange}
                  type='text'
                  size='lg'
                  placeholder='Enter name of Person'
                />
                <br></br>
                <Form.Control
                  name='searchPlace'
                  value={searchInput.searchPlace}
                  onChange={handleInputChange}
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
              <Card key={item.name} border='dark'>
                <Card.Body>
                  <Card.Title>{item.name} </Card.Title>
                  <p className='medium'>{item.born}</p>
                  <p className='medium'>{item.died}</p>
                  <p className='medium'>{item.description}</p>
                  <p className='medium'>{item.dateBuilt}</p>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default  SearchHistoricalItems;

