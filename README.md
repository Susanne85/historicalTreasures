# Historical Treasures
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

## Description

This is an applicaion which allows a user to search for people or places that their local Historical Society holds.  Users are able to save items to their cart and they are able to delete items from their cart.
Users are also able to add a person record to the Historical Treasures database.


## 📖Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Assets](#assets)
4. [Technologies](#technologies)
5. [License](#license)
6. [Contributing](#contributing)
7. [Tests](#tests)
8. [Questions](#questions)

## Installation
1. To install this application clone it through GitHub using the following code in the terminal: 
    ``` 
    git clone https://github.com/Susanne85/historicalTreasures
    ```
2. To add the dependencies to the application, navigate to the root directory for the application and run:
    ```js
    npm install
    npm install express
    npm install dotenv
    npm install apollo-server-express graphql
    npm install @neo4j/graphql
    npm install graphql neo4j-driver
    npm install bcrypt
    ```
    
## Usage
Once the host, port, user, password and database details have been provided to the connection and the database has been created, navigate to the root directory for the application and run the following code in the terminal to start the application:

```js
npm start
```

## Assets

Live demo of the application hosted on Heroku: [Turn Back Time](https://https://historical-treasures-2021.herokuapp.com/)

The following images shows the functionality of the application: 
 
![Turn Back Time Home Page](./server/public/images/Turn_Back_Time_Home_Page.png)

 
## Technologies
- [Node.js](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/)
- [Apollo](https://www.apollographql.com/docs/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [neo4j](https://neo4j.com/)
- JavaScript

## License

This project is [MIT](./LICENSE) licensed

## Contributing
Contributions, issues and feature requests are welcome.

Feel free to check the [issues page](https://github.com/Susanne85/historicalTreasures) if you want to contribute.

## Tests
There are no tests currently for this application.

## Questions
For any questions, please contact the author:

- Github: [@Susanne](https://github.com/Susanne85)