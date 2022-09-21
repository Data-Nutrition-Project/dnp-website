# dnp-api

Backend for DNP website, ingestion engine, and all things DNP. Built in Node.

### Quickstart

1. Pull down the repo
1. run `docker-compose up` to start your local database
1. copy the sample `.env` file from below to a new file with the name `.env`
1. run `npm install` to get all the modules
1. run `npm run start` to begin the API

##### dotenv

There are no real secrets in here yet :)

```
PORT=3000
DB_URL=mongodb://localhost:27017/dnp-api
TEST_DB_URL=mongodb://localhost:27017/dnp-test
```

#### Routes

###### Templates

- `POST /template`: Saves a new template to the database.
- `GET /template?id=...`: Gets a template with the given id from the database.

###### Questionnaires

- `POST /questionnaire`: Saves a questionnaire to the database, incrementing its schema_version. Returns the new questionnaire object.
- `GET /questionnaire?id=...`: Gets the most recent version of a questionnaire with a given id.
- `GET /new-questionnaire?id=...`: Gets an empty template of a given id to be used as a questionnaire.

## Full Flow

1. `POST /templates` with body => { questoinnaire }
1. `GET /templates` returns most recent template
1. `POST /questionnaires/new` with body => { id, reason, title }
1. `POST /questionnaires/{dnpId}/update` with body => { questionnaire, title, reason, dnpId, schema_version, \_id, savedDate }
1. Repeat last step until the questionnaire is done
1. `POST /labels` with body => { questionnaire, title, reason, dnpId, schema_version, \_id, savedDate } to submit the label
1. `POST /questionnaires/{dnpId}/update` is locked
1. `POST /labels/{dnpId}/changes` requests changes for the given label
1. `POST /questionnaires/{dnpId}/update` with body => { questionnaire, title, reason, dnpId, schema_version, \_id, savedDate }
1. Repeat last step until the questionnaire is done
1. `POST /labels` with body => { questionnaire, title, reason, dnpId, schema_version, \_id, savedDate } to submit the label again
1. `POST /label/{dnpId}/approve` approves the given label
1. `POST /questionnaires/{dnpId}/update` is locked
