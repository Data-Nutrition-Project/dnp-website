require('dotenv').config()

const { connect } = require('../database/connector.js')
const { TemplateService } = require('../database/template.js')
const { TemplatesRouter } = require('../routes/template.js')

const request = require('supertest')
const express = require('express')

const app = express()

let templateService
let templatesCollection
const templatesToDelete = []

describe('/template routes', () => {
  beforeAll(async () => {
    const client = await connect(process.env.DB_URL).catch(console.dir)
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

  // it('adds to the database with POST', async (done) => {
  //   request(app)
  //     .post('/template')
  //     .send({
  //       version: 1,
  //       questions: [],
  //       status: 'draft'
  //     })
  //     .expect(200, done)
  // })

  it('gets an existing one with GET', async () => {
    // jest.setTimeout(30000);
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
});

const dummyTemplate = () => ({
  version: 3,
  questions: ["how much chuck could a would chuck chuck?"],
  status: 'draft'
})
