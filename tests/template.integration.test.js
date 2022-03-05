require('dotenv').config()
const { ObjectID } = require('mongodb')

const { connect } = require('../database/connector.js')
const { TemplateService } = require('../database/template.js')
const { TemplatesRouter } = require('../routes/template.js')

const request = require('supertest')
const express = require('express')

const app = express()
app.use(express.json())

let templateService
let templatesCollection
const templatesToDelete = []

describe('/template routes', () => {
  beforeAll(async () => {
    const client = await connect(process.env.TEST_DB_URL).catch(console.dir)
    await client.connect()
    const database = client.db("dnp-test")
    templatesCollection = database.collection("templates")

    templateService = new TemplateService(templatesCollection)
    TemplatesRouter(app, templateService)
  })

  // we want to cleanup all the things we inserted afterwards
  afterAll(async () => {
    await Promise.all(
      templatesToDelete.map(
        templateId => templatesCollection.deleteOne({_id: templateId})
      )
    )
  })

  it('denies an invalid template', (done) => {
    request(app)
      .post('/template')
      .send({arco: 'iris'})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400, done)
  })

  it('adds to the database with POST', async () => {
    const dummy = {
      version: 247,
      questions: [],
      status: 'draft'
    }

    const response = await request(app)
      .post('/template')
      .send(dummy)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    const id = new ObjectID(response.body.id)
    templatesToDelete.push(id)

    expect(response.status).toEqual(200)
    expect(response.body.id).toBeDefined()

    const foundTemplate = await templateService.getTemplate(id)

    expect(foundTemplate._id).toEqual(id)
    expect(foundTemplate.questions).toEqual(dummy.questions)
    expect(foundTemplate.version).toEqual(dummy.version)
  })

  it('gets an existing one with GET', async () => {
    const dummy = dummyTemplate()
    const addedTemplate = await templateService.addTemplate(dummy)
    templatesToDelete.push(addedTemplate.insertedId)

    const foundTemplate = await templateService.getTemplate(addedTemplate.insertedId)
    expect(foundTemplate._id).toEqual(addedTemplate.insertedId)
    expect(foundTemplate.questions).toEqual(dummy.questions)
    expect(foundTemplate.version).toEqual(dummy.version)

    const response = await request(app)
      .get(`/template?id=${addedTemplate.insertedId}`)
      .expect(200)

    expect(response.body.version).toBe(dummy.version)
  })

  it('wont find an imaginary template', (done) => {
    request(app)
      .get(`/template?id=baddabbaddabbaddabbaddab`)
      .expect(404, done)
  })
});

const dummyTemplate = () => ({
  version: 3,
  questions: ["how much chuck could a would chuck chuck?"],
  status: 'draft'
})
