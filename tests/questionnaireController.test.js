require('dotenv').config()
const { ObjectID } = require('mongodb')

const { connect } = require('../database/connector.js')

const { TemplateService } = require('../database/template.js')
const { QuestionnaireService } = require('../database/questionnaire.js')
const { QuestionnaireController } = require('../controllers/questionnaire.js')


let templatesCollection
let templateService

let questionnairesCollection
let questionnaireService

let questionnairesController

const questionnairesToDelete = []
const templatesToDelete = []

describe("questionnaires controller", () => {

  // connect to our database at the beginning
  beforeAll(async () => {
    const client = await connect(process.env.TEST_DB_URL).catch(console.dir)
    await client.connect()
    const database = client.db("dnp-test")

    questionnairesCollection = database.collection("questionnaires")
    questionnaireService = new QuestionnaireService(questionnairesCollection)

    templatesCollection = database.collection("templates")
    templateService = new TemplateService(templatesCollection)

    questionnairesController = new QuestionnaireController(questionnaireService, templateService)
  })

  // we want to cleanup all the things we inserted afterwards
  afterAll(async () => {
    await Promise.all(
      questionnairesToDelete.map(
        questionnaireId => questionnairesCollection.deleteOne({_id: questionnaireId})
      )
    )
    await Promise.all(
      templatesToDelete.map(
        templateId => templatesCollection.deleteOne({_id: templateId})
      )
    )
  })

  // create a new template
  // get a questionnaire from that id
  // affirm the return and the db make sense
  it('can start a new questionnaire', async () => {
    const template = await templateService.addTemplate(dummyTemplate())
    templatesToDelete.push(template.insertedId)

    const newQuestionnaire = await questionnairesController
      .createQuestionnaireFromTemplate(template.insertedId, 'meh', 'what do you want from me')
    questionnairesToDelete.push(newQuestionnaire._id)

    // make sure our return is correct
    expect(newQuestionnaire).toBeDefined()
    expect(newQuestionnaire._id).toBeDefined()
    expect(newQuestionnaire._id).not.toBe(template.insertedId)
    expect(newQuestionnaire.dnpId).toBeDefined()
    expect(newQuestionnaire.title).toBeDefined()
    expect(newQuestionnaire.labelReason).toBeDefined()

    // make sure out db feels the same way
    const questionnaire = await questionnaireService.getQuestionnaire(newQuestionnaire._id)
    expect(questionnaire).toBeDefined()
    expect(questionnaire._id).toBeDefined()
    expect(questionnaire.dnpId).toBeDefined()
    expect(questionnaire.title).toBeDefined()
    expect(questionnaire.labelReason).toBeDefined()
  })

  // create a new template
  // save it the first time without a version
  // save it again with the controller to initialize the version
  // save it third time to bump the version
  it('can save a questionnaire properly with schema versioning', async () => {
    // initial insert, like when a user starts a questionnaire
    const questionnaireInserted = await questionnaireService.addQuestionnaire(dummyQuestionnaire())
    const questionnaireOne = await questionnaireService.getQuestionnaire(questionnaireInserted.insertedId)
    questionnairesToDelete.push(questionnaireOne._id)
    expect(questionnaireOne).toBeDefined()
    expect(questionnaireOne.schema_version).not.toBeDefined()

    // they save for the first time
    const savedQuestionnaireTwo = await questionnairesController.saveQuestionnaire(questionnaireOne)
    const questionnaireTwo = await questionnaireService.getQuestionnaire(savedQuestionnaireTwo._id)
    questionnairesToDelete.push(questionnaireTwo._id)
    expect(questionnaireTwo).toBeDefined()
    expect(questionnaireTwo.schema_version).toBeDefined()
    expect(questionnaireTwo.schema_version).toBe(2)
    expect(questionnaireTwo._id).not.toBe(questionnaireOne._id) // we want a different one

    // they save for a second time
    const savedQuestionnaireThree = await questionnairesController.saveQuestionnaire(questionnaireTwo)
    const questionnaireThree = await questionnaireService.getQuestionnaire(savedQuestionnaireThree._id)
    questionnairesToDelete.push(questionnaireThree._id)
    expect(questionnaireThree).toBeDefined()
    expect(questionnaireThree.schema_version).toBeDefined()
    expect(questionnaireThree.schema_version).toBe(3)
    expect(questionnaireThree._id).not.toBe(questionnaireTwo._id) // we want a different one
  })

  // look for a made up template id
  // confirm that it is null
  it('will not find a made up template', async () => {
    const foundTemplate = await questionnairesController
      .createQuestionnaireFromTemplate("aqui, la cuenta es pequena, los desserts son grande")
    expect(foundTemplate).toEqual(null)
  })
})

const dummyQuestionnaire = () => ({
  version: 8675309,
  questionnaire: [],
  status: 'big ups ya?',
  name: 'Rob'
})
const dummyTemplate = () => ({
  version: 8675310,
  questionnaire: [],
  status: 'down in front',
})
