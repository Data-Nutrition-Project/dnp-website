require("dotenv").config();
const { ObjectID } = require("mongodb");

const { connect } = require("../database/connector.js");
const { TemplateService } = require("../database/template.js");
const { QuestionnaireService } = require("../database/questionnaire.js");

const { QuestionnaireController } = require("../controllers/questionnaire.js");

const { QuestionnairesRouter } = require("../routes/questionnaire.js");
const { TemplatesRouter } = require("../routes/template.js");

const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());

let templateService;
let templatesCollection;

let questionnaireService;
let questionnaresCollection;
let questionnaireController;

const templatesToDelete = [];
const questionnairesToDelete = [];

describe("DNP API", () => {
  beforeAll(async () => {
    const client = await connect(process.env.TEST_DB_URL).catch(console.dir);
    await client.connect();
    const database = client.db("dnp-test");
    templatesCollection = database.collection("templates");
    questionnairesCollection = database.collection("questionnaires");

    templateService = new TemplateService(templatesCollection);
    questionnaireService = new QuestionnaireService(questionnairesCollection);
    questionnaireController = new QuestionnaireController(
      questionnaireService,
      templateService
    );

    QuestionnairesRouter(app, questionnaireController, questionnaireService);
    TemplatesRouter(app, templateService);
  });

  // we want to cleanup all the things we inserted afterwards
  afterAll(async () => {
    await Promise.all(
      templatesToDelete.map((templateId) =>
        templatesCollection.deleteOne({ _id: templateId })
      )
    );
    await Promise.all(
      questionnairesToDelete.map((questionnaireId) =>
        questionnairesCollection.deleteOne({ _id: questionnaireId })
      )
    );
  });

  // create a template with post
  // find it using get
  // start a questionnaire with that template
  // save it 2 times with post
  // get the max version with get
  it("can go through the flow of templates and questionnaires", async () => {
    const name = "Jimmy";
    //
    // we need a template to start off with
    //
    const dummy = dummyTemplate();
    const templateResponse = await request(app)
      .post("/template")
      .send(dummy)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
    const templateId = new ObjectID(templateResponse.body.id);
    templatesToDelete.push(templateId);

    // make sure we can find it in the db
    const foundTemplate = await request(app)
      .get(`/template?id=${templateResponse.body.id}`)
      .expect(200);

    //
    // start a new empty questionnaire with that template
    //
    const newQuestionnaireResponse = await request(app)
      .post(`/new-questionnaire`)
      .send({
        id: templateResponse.body.id,
        title: name,
        reason: "I wanted to!!!",
      })
      .expect(200);
    const newQuestionnaireId = new ObjectID(newQuestionnaireResponse.body._id);
    questionnairesToDelete.push(newQuestionnaireId);

    // make sure we can find the new questionnaire in the db
    const foundNewQuestionnaire = await request(app)
      .get(`/questionnaire?id=${newQuestionnaireResponse.body.dnpId}`)
      .expect(200);
    const workingQuestionnaire = foundNewQuestionnaire.body;
    expect(workingQuestionnaire.schema_version).not.toBeDefined();

    //
    // let's fill out some questions
    //
    workingQuestionnaire.questionnaire.push("I think, there for I am?");
    const firstSavedQuestionnaireResponse = await request(app)
      .post(`/questionnaire?id=${workingQuestionnaire.dnpId}`)
      .send(workingQuestionnaire) // not so empty anymore
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
    const firstSavedId = new ObjectID(firstSavedQuestionnaireResponse.body._id);
    questionnairesToDelete.push(firstSavedId);
    expect(firstSavedQuestionnaireResponse.body.schema_version).toBe(2);
    // need to update our model to keep track of important info the api tells us
    workingQuestionnaire._id = firstSavedId;
    workingQuestionnaire.schema_version =
      firstSavedQuestionnaireResponse.body.schema_version;

    // lets do that again
    workingQuestionnaire.questionnaire.push(
      "All we are, is dust in the wind, dude?"
    );
    const secondSavedQuestionnaireResponse = await request(app)
      .post(`/questionnaire?id=${workingQuestionnaire.dnpId}`)
      .send(workingQuestionnaire) // not so empty anymore
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
    const secondSavedId = new ObjectID(
      secondSavedQuestionnaireResponse.body._id
    );
    questionnairesToDelete.push(secondSavedId);
    expect(secondSavedQuestionnaireResponse.body.schema_version).toBe(3);

    // need to update our model to keep track of important info the api tells us
    workingQuestionnaire._id = secondSavedId;
    workingQuestionnaire.schema_version =
      secondSavedQuestionnaireResponse.body.schema_version;

    //
    // now lets find the most recent version in our database
    //
    const newestQuestionnaireResponse = await request(app)
      .get(`/questionnaire?id=${newQuestionnaireResponse.body.dnpId}`)
      .expect(200);
    expect(newestQuestionnaireResponse.body.schema_version).toBe(3);
  });
});

const dummyTemplate = () => ({
  version: 444,
  questionnaire: ["what say you?"],
  status: "thinking about it",
});
