import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns, Alert } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { saveItemIds, getSavedItemIds } from '../utils/localStorage';
import { GET_PEOPLE, GET_PLACE } from '../utils/queries';
import { SAVE_ITEM } from '../utils/mutations';
function getPlaceName(place) {
  if (place.length > 0) {
    return place[0].name
  }
  return ''
}
function getSpouseName(spouse) {
  if (spouse.length > 0) {
    return spouse[0].name + ' ' + spouse[0].surname
  }
  return ''
}
const SearchHistoricalItems = () => {

  const [searchInput, setSearchInput] = useState({
    searchPerson: '',
    searchPlace: '',
  });

  const [searchedItems, setSearchedItems] = useState([]);
  const [savedItemIds, setSavedItemIds] = useState(getSavedItemIds());
  const { error, loading, data: userData } = useQuery(GET_PEOPLE);
  
  const { errorPlace, loadingPlace, data: placeData } = useQuery(GET_PLACE);

  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    return () => saveItemIds(savedItemIds);
  });

  const [saveItem] = useMutation(SAVE_ITEM);

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

    try {
      let itemData = [];
      if (searchInput.searchPerson !== '') {
        itemData = userData.people.map((item) => ({
          accessionId: item.accessionId,
          name: item.name + ' ' + item.surname,
          surname: item.surname,
          born: item.born,
          died: item.died,
          buried: getPlaceName(item.buriedInPlaces),
          spouse: getSpouseName(item.married),
          lived: getPlaceName(item.livedInPlaces),
          dateBuilt: ''
        }));

        if (searchInput.searchPerson !== "*") {
          itemData = itemData.filter(function (item) { return item.surname === searchInput.searchPerson });
        }

      } else if (searchInput.searchPlace !== '') {
        itemData = placeData.places.map((item) => ({
          accessionId: item.accessionId,
          name: item.name,
          description: item.description,
          dateBuilt: item.dateBuilt,
          surname: '',
          born: '',
          died: '',
          buried: '',
          spouse: '',
          lived: ''
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

  const handleSaveItem = async (itemId) => {

    const itemToSave = searchedItems.find((item) => item.accessionId === itemId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    const userProfile = Auth.getProfile();

    if (itemToSave.surname !== undefined) {
      delete itemToSave.surname;
      delete itemToSave.born;
      delete itemToSave.died;
    } else {
      delete itemToSave.dateBuilt;
    }

    try {
      const { data } = await saveItem({
        variables: {
          email: userProfile.data.email,
          itemData: {
            ...itemToSave,
          }
        }
      })

      setSavedItemIds([...savedItemIds, itemToSave.accessionId]);
    } catch (error) {
      console.error(error);
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
            <Form.Row>Surname
              <Col xs={12} md={8} style={({ marginLeft: '1.2rem' })}>
                <Form.Control
                  name='searchPerson'
                  value={searchInput.searchPerson}
                  onChange={handleInputChange}
                  type='text'
                  size='md'
                  placeholder='Enter surname of Person'
                />
              </Col>
            </Form.Row>
            <br></br>
            <Form.Row>Place Name
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchPlace'
                  value={searchInput.searchPlace}
                  onChange={handleInputChange}
                  type='text'
                  size='md'
                  placeholder='Enter name of Place'
                />
              </Col>
            </Form.Row>
            <br></br>
            <Form.Row>
              <Button type='submit' variant='success' size='md'>
                Submit Search
              </Button>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron >

      <Container>
        <CardColumns>
          {searchedItems.map((item) => {
            return (
              <Card key={item.accessionId} border='dark'>
                <Card.Body>
                  <Card.Title>{item.name} </Card.Title>
                  <p className='medium'>Accesion ID : {item.accessionId}</p>
                  {item.born !== '' && <p className='medium'>Born: {item.born}</p>}
                  {item.spouse !== '' && <p className='medium'>Spouse: {item.spouse}</p>}
                  {item.died !== '' &&
                    <p className='medium'>Died: {item.died}</p>}
                  {item.buried !== '' &&
                    <p className='medium'>Buried in: {item.buried}</p>}
                  {item.lived !== '' &&
                    <p className='medium'>Lived in: {item.lived}</p>}
                  <p className='medium'>{item.description}</p>
                  {item.dateBuilt !== '' &&
                  <p className='medium'>Date Built: {item.dateBuilt}</p>}
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedItemIds?.some((savedItemId) => savedItemId === item.accessionId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveItem(item.accessionId)}>
                      {savedItemIds?.some((savedItemId) => savedItemId === item.accessionId)
                        ? 'This item has already been saved!'
                        : 'Save this item!'}
                    </Button>
                  )}
                  {!Auth.loggedIn() && (
                    <Card.Text>Log in to save items to your cart</Card.Text>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchHistoricalItems;

