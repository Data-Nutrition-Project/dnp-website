require('dotenv').config()
const { ObjectID } = require('mongodb')

const { connect } = require('../database/connector.js')
const { TemplateService } = require('../database/template.js')
const { QuestionnaireService } = require('../database/questionnaire.js')
const { QuestionnaireController } = require('../controllers/questionnaire.js')
const { QuestionnairesRouter } = require('../routes/questionnaire.js')

const request = require('supertest')
const express = require('express')

const app = express()
app.use(express.json())

let templateService
let templatesCollection

let questionnaireService
let questionnaresCollection
let questionnaireController

const templatesToDelete = []
const questionnairesToDelete = []

describe('/questionnaire routes', () => {
  beforeAll(async () => {
    const client = await connect(process.env.TEST_DB_URL).catch(console.dir)
    await client.connect()
    const database = client.db("dnp-test")
    templatesCollection = database.collection("templates")
    questionnairesCollection = database.collection("questionnaires")

    templateService = new TemplateService(templatesCollection)
    questionnaireService = new QuestionnaireService(questionnairesCollection)
    questionnaireController = new QuestionnaireController(questionnaireService, templateService)
    QuestionnairesRouter(app, questionnaireController, questionnaireService)
  })

  // we want to cleanup all the things we inserted afterwards
  afterAll(async () => {
    await Promise.all(
      templatesToDelete.map(
        templateId => templatesCollection.deleteOne({_id: templateId})
      )
    )
    await Promise.all(
      questionnairesToDelete.map(
        questionnaireId => questionnairesCollection.deleteOne({_id: questionnaireId})
      )
    )
  })

  // create a template in the db
  // use the api to generate a new questionnaire
  // make sure it created questionnaire in the db
  it('can create a new questionnaire', async () => {
    const newTemplate = await templateService.addTemplate(dummyTemplate())
    templatesToDelete.push(newTemplate.insertedId)
    const response = await request(app)
      .get(`/new-questionnaire?id=${newTemplate.insertedId}`)
      .expect(200)

    expect(response.body._id).toBeDefined()

    const id = new ObjectID(response.body._id)
    questionnairesToDelete.push(id)
    const foundQuestionnaire = questionnaireService.getQuestionnaire(id)

    expect(foundQuestionnaire).toBeDefined()
  })

  // search for an imaginary questionnaire through the api
  it('wont find an imaginary template', (done) => {
    request(app)
      .get(`/new-questionnaire?id=baddabbaddabbaddabbaddab`)
      .expect(404, done)
  })

  // create a questionnaire
  // insert it with the service
  // use the app to find it
  // make sure the ids match up
  it('can find an existing questionnaire', async () => {
    const dummyQuestionnaire = dummyTemplate()
    dummyQuestionnaire.dnpId = 'cest moi'
    const newQuestionnaire = await questionnaireService.addQuestionnaire(dummyQuestionnaire)
    questionnairesToDelete.push(newQuestionnaire.insertedId)

    const response = await request(app)
      .get(`/questionnaire?id=${dummyQuestionnaire.dnpId}`)
      .expect(200)
    const id = new ObjectID(response.body._id)

    expect(id).toEqual(newQuestionnaire.insertedId)
  })

  // create a questionnaire
  // use the api to save a new version of it
  // make sure the database has the new version
  // and bumped the schema_version
  it('can save a questionnaire', async () => {
    const dummyQuestionnaire = dummyTemplate()
    dummyQuestionnaire.dnpId = 'cest moi'
    const newQuestionnaire = await questionnaireService.addQuestionnaire(dummyQuestionnaire)
    questionnairesToDelete.push(newQuestionnaire.insertedId)
    const foundQuestionnaire = await questionnaireService.getQuestionnaire(newQuestionnaire.insertedId)

    const response = await request(app)
      .post(`/questionnaire?id=${foundQuestionnaire.dnpId}`)
      .send(foundQuestionnaire)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
    const id = new ObjectID(response.body.id)
    questionnairesToDelete.push(id)

    const savedQuestionnaire = await questionnaireService.getQuestionnaire(id)
    expect(savedQuestionnaire).toBeDefined()
    expect(savedQuestionnaire.dnpId).toBe(dummyQuestionnaire.dnpId)
    expect(savedQuestionnaire.schema_version).toBe(2)
  })
})

const dummyTemplate = () => ({
  version: 444,
  questions: ["what say you?"],
  status: 'thinking about it'
})
