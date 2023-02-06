// This script acquires the auth token from the endpoint
// using the imported credentials. 
// The auth token is exported to ./bearer-token.js

import fs from 'fs'
import querystring from 'querystring'
import { clientAuthCredentials } from './clientCredentials.js'

const client_id = clientAuthCredentials.client_id
const client_secret = clientAuthCredentials.client_secret;

const postData = querystring.stringify({
  client_id: client_id,
  client_secret: client_secret,
  grant_type: 'client_credentials'
});

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'cache-control': 'no-cache'
  },
  body: postData
};

fetch(clientAuthCredentials.endpoint, options)
  .then((result) => result.json())
  .then((data) => {
    // The token doesn't need to be saved and will be stored as a const once project complete. 
  fs.writeFile('./bearer-token.js', `const bToken = ${JSON.stringify(data)} \n\n export { bToken }`, (err) => {
    if (err) throw err;
    console.log('Bearer Token Retrieved!', data);
  });
  })
  .catch((error) => console.error(error));
