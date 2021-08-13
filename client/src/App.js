import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchHistoricalItems from './pages/SearchHistoricalItems';
import SavedItems from './pages/SavedItems';
import AddPerson from './pages/AddPerson';
import Navbar from './components/Navbar';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client} >
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchHistoricalItems} />
          <Route exact path='/saved' component={SavedItems} />
          <Route exact path='/add' component={AddPerson} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
