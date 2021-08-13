import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns, Alert } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';

import {CREATE_PERSON} from '../utils/mutations'
const AddPerson = () => {

  const [createPerson, setCreatePerson] = useState({
    accessionId: '',
    name: '',
    surname: '',
    born: '',
    died: ''
  });

  const [showAlert, setShowAlert] = useState(false);
  const [addNewPerson] = useMutation(CREATE_PERSON);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let newValue = value;
    if (name === 'surname' || (name === 'name')) {
      newValue = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setCreatePerson({ ...createPerson, [name]: newValue });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log('1', createPerson.accessionId);
    console.log('2', createPerson.surname);
    

    try {
      const { data } = await addNewPerson({
        variables: {
          personData: {
            ...{accessionId: createPerson.accessionId,
              name: createPerson.name,
              surname: createPerson.surname,
              born: createPerson.born,
              died: createPerson.died}
          }
        }
      })

    } catch (error) {
      console.error(error);
    }    
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Enter Details for a Person</h1>
          <p>Accession Id, First Name and Surname must be entered</p>
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Only Person or Place can be searched!
          </Alert>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='accessionId'
                  value={createPerson.accesionId}
                  onChange={handleInputChange}
                  type='text'
                  size='lg'
                  placeholder='Accession Id'
                  required  
                />
                <Form.Control.Feedback type="invalid">
                  Please enter an Accession Id
                </Form.Control.Feedback>
                <br></br>
                <Form.Control
                  name='name'
                  value={createPerson.name}
                  onChange={handleInputChange}
                  type='text'
                  size='lg'
                  placeholder='First Name'
                  required  
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a First Name
                </Form.Control.Feedback>
                <br></br>
                <Form.Control
                  name='surname'
                  value={createPerson.surname}
                  onChange={handleInputChange}
                  type='text'
                  size='lg'
                  placeholder='Surname'
                  required  
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a Surname
                </Form.Control.Feedback>
                <br></br>
                <Form.Control
                  name='born'
                  value={createPerson.born}
                  onChange={handleInputChange}
                  type='text'
                  size='lg'
                  placeholder='Date of birth'
                />
                <br></br>
                <Form.Control
                  name='died'
                  value={createPerson.died}
                  onChange={handleInputChange}
                  type='text'
                  size='lg'
                  placeholder='Date of Death'
                />
                <br></br>
                <Button type='submit' variant='success' size='lg'>
                  Add New Person
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>
    </>
  );
};

export default AddPerson;
