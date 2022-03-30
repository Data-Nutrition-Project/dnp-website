require('dotenv').config()
const { ObjectID } = require('mongodb')

const { connect } = require('../database/connector.js')
const { QuestionnaireService } = require('../database/questionnaire.js')

let questionnairesCollection
let questionnaireService
const questionnairesToDelete = []

describe("questionnaires service", () => {

  // connect to our database at the beginning
  beforeAll(async () => {
    const client = await connect(process.env.TEST_DB_URL).catch(console.dir)
    await client.connect()
    const database = client.db("dnp-test")
    questionnairesCollection = database.collection("questionnaires")
    questionnaireService = new QuestionnaireService(questionnairesCollection)
  })

  // we want to cleanup all the things we inserted afterwards
  afterAll(async () => {
    await Promise.all(
      questionnairesToDelete.map(
        questionnaireId => questionnairesCollection.deleteOne({_id: questionnaireId})
      )
    )
  })

  // add a questionnaire with our methods
  // look for it in the db
  // confirm it was there :)
  it('can add a new questionnaire', async () => {
    const questionnaireToAdd = dummyQuestionnaire()
    const questionnaire = await questionnaireService.addQuestionnaire(questionnaireToAdd)
    questionnairesToDelete.push(questionnaire.insertedId)

    const readQuestionnaires = await questionnairesCollection.find().toArray()
    const foundQuestionnaire = readQuestionnaires.find(e => e._id.toString() == questionnaire.insertedId.toString())
    expect(foundQuestionnaire).toEqual(questionnaireToAdd)
  });

  // add a questionnaire into our database
  // use our method to find it
  // assert they are the same
  it('can find an existing questionnaire', async () => {
    const questionnaireToAdd = dummyQuestionnaire()
    const questionnaire = await questionnairesCollection.insertOne(questionnaireToAdd)
    questionnairesToDelete.push(questionnaire.insertedId)

    const foundQuestionnaire = await questionnaireService.getQuestionnaire(questionnaire.insertedId)
    expect(foundQuestionnaire).toEqual(questionnaireToAdd)
  })

  // look for a made up questionnaire id
  // confirm that it is null
  it('will not find a made up questionnaire', async () => {
    const foundQuestionnaire = await questionnaireService.getQuestionnaire("aqui, la cuenta es pequena, los desserts son grande")
    expect(foundQuestionnaire).toEqual(null)
  })

  // add a uuid to a blank questionnaire
  // insert it
  // find it again and assert it exists
  it('can get a questionnaire by its dnp id', async () => {
    const uuid = "unique as it gets mate"
    const questionnaireToAdd = dummyQuestionnaire()
    questionnaireToAdd.dnpId = uuid

    const questionnaire = await questionnairesCollection.insertOne(questionnaireToAdd)
    questionnairesToDelete.push(questionnaire.insertedId)

    const foundQuestionnaire = await questionnaireService.getQuestionnaireByDnpId(uuid)
    expect(foundQuestionnaire).toBeDefined()
    expect(foundQuestionnaire).toEqual(questionnaireToAdd)
  })

  // insert one
  // insert another with a higher version
  // get the newest
  // make sure its the newest
  it('can get the newest schema_version', async () => {
    const dnpId = '1234 I declare thumb war'

    const questionnaireToAdd1 = dummyQuestionnaire()
    questionnaireToAdd1.schema_version = 4
    questionnaireToAdd1.dnpId = dnpId
    const questionnaire1 = await questionnairesCollection.insertOne(questionnaireToAdd1)
    questionnairesToDelete.push(questionnaire1.insertedId)

    const questionnaireToAdd2 = dummyQuestionnaire()
    questionnaireToAdd2.schema_version = 5
    questionnaireToAdd2.dnpId = dnpId
    const questionnaire2 = await questionnairesCollection.insertOne(questionnaireToAdd2)
    questionnairesToDelete.push(questionnaire2.insertedId)

    const questionnaireToAdd3 = dummyQuestionnaire()
    questionnaireToAdd3.dnpId = dnpId
    const questionnaire3 = await questionnairesCollection.insertOne(questionnaireToAdd3)
    questionnairesToDelete.push(questionnaire3.insertedId)

    const newestQuestionnaire = await questionnaireService.getNewestQuestionnaire(dnpId)
    expect(newestQuestionnaire).toBeDefined()
    expect(newestQuestionnaire.schema_version).toBe(5)
  })
})

const dummyQuestionnaire = () => ({
  version: 1,
  questions: [],
  status: 'draft'
})
