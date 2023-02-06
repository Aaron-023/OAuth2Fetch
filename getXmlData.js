// This script imports the auth token from ./bearer-token.js and
// calls the endpoint for the job data provided by the API.
// The payload is written to ./receivedPayload.xml.


import fs from 'fs'
import { bToken } from './bearer-token.js'
import { clientGetCredentials } from './clientCredentials.js'

const options = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${bToken.access_token}`
    }
};

async function getPayload() {
    const response = await fetch(clientGetCredentials.target, options)
    
    if(response.status == 200){
        console.log('SUCCESS: ', response)
        const data = await response.text()
        fs.writeFile('./payload.xml', data, (err) => {
            if (err) { throw err }
        })
    } else {
        console.log('Not successful', response.status, response.statusText)
    }
}

getPayload()