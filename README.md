# Fetching Auth 2.0 Bearer Token

These scripts written in NodeJS acquire a bearer token via an API POST request using a client secret. 

## getBearerToken.js
This script submits a client secret and obtains a bearer token, the token is then saved externally for later use.


## getXmlData.js
This script uses the retrieved bearer token and submits it to the API using a GET method, the XML payload is saved to a file ready for use by an external application.

