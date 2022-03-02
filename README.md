# dnp-api
Backend for DNP website, ingestion engine, and all things DNP. Built in Node.

### Quickstart
1. Pull down the repo
1. run `docker-compose up` to start your local database
1. copy the sample `.env` file from below to a new file with the name `.env`
1. run `npm install` to get all the modules
1. run `npm run start` to begin the API
1. visit http://localhost:3000/hello in your browser to see a message!


##### dotenv
There are no real secrets in here yet :)
```
PORT=3000
DB_URL=mongodb://localhost:27017/dnp-api
TEST_DB_URL=mongodb://localhost:27017/dnp-test
```
