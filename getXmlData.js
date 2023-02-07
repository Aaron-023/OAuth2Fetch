// This script imports the auth token from ./bearer-token.js and
// calls the endpoint for the job data provided by the API.
// The payload is written to ./receivedPayload.xml.
// Nodecron is used to call the script peroidically.

import nodecron from 'node-cron'
import fs from 'fs'
import { clientGetCredentials } from './clientCredentials.js'

// references the bearer token
let bToken

async function getPayload() {
    bToken = JSON.parse(fs.readFileSync('./bearer-token.json'))
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bToken.access_token}`
        }
    };
    
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

nodecron.schedule('15,45 0-23 * * 1-5', () => {
    getPayload()
})