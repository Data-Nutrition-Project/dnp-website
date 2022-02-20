require('dotenv').config()

const { connect } = require('../database/connector.js')
const { TemplateService } = require('../database/template.js')

let templates
let templateService
const templatesToDelete = []

describe("templates service", () => {

  // connect to our database at the beginning
  beforeAll(async () => {
    const client = await connect(process.env.TEST_DB_URL).catch(console.dir)
    await client.connect()
    const database = client.db("dnp-test")
    templates = database.collection("templates")
    templateService = new TemplateService(templates)
  })

  // we want to cleanup all the things we inserted afterwards
  afterAll(async () => {
    await Promise.all(
      templatesToDelete.map(
        templateId => templates.deleteOne({_id: templateId})
      )
    )
  })

  // add a template with our methods
  // look for it in the db
  // confirm it was there :)
  it('can add a new template', async () => {
    const templateToAdd = dummyTemplate()
    const template = await templateService.addTemplate(templateToAdd)
    templatesToDelete.push(template.insertedId)

    const readTemplates = await templates.find().toArray()
    // this is here to make sure we clean up after ourselves
    expect(readTemplates.length).toBe(1)
    expect(readTemplates[0]).toEqual(templateToAdd)
  });

  // add a template into our database
  // use our method to find it
  // assert they are the same
  it('can find an existing template', async () => {
    const templateToAdd = dummyTemplate()
    const template = await templates.insertOne(templateToAdd)
    templatesToDelete.push(template.insertedId)

    const foundTemplate = await templateService.getTemplate(template.insertedId)
    expect(foundTemplate).toEqual(templateToAdd)
  })
})

const dummyTemplate = () => ({
  version: 1,
  questions: [],
  status: 'draft'
})
