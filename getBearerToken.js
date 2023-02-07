// This script acquires the auth token from the endpoint
// using the imported credentials. 
// The auth token is exported to ./bearer-token.js

import nodecron from 'node-cron'
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

async function getAuthToken() {
  const response = await fetch(clientAuthCredentials.endpoint, options)
    if(response.status === 200){
      const data = await response.json()
      fs.writeFile('./bearer-token.json', `${JSON.stringify(data)}`, (err) => {
      console.log('Bearer Token Retrieved!', data);
        if (err) { throw err; }
      
    })
    } else {
      console.log("some error")
    }
}



nodecron.schedule('0,30 0-23 * * 1-5', () => {
  getAuthToken()
})