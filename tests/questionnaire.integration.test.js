require("dotenv").config();
jest.mock("../controllers/email.js");

const { ObjectID } = require("mongodb");

const { connect } = require("../database/connector.js");

const { TemplateService } = require("../database/template.js");

const { QuestionnaireService } = require("../database/questionnaire.js");
const { QuestionnaireController } = require("../controllers/questionnaire.js");
const { QuestionnairesRouter } = require("../routes/questionnaire.js");

const { LabelService } = require("../database/label.js");

const { EmailController } = require("../controllers/email.js");

const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());

let templateService;
let templatesCollection;

let questionnaireService;
let questionnairesCollection;

let labelsCollection;
let labelService;

let questionnaireController;

let emailController;

const questionnairesToDelete = [];
const templatesToDelete = [];
const labelsToDelete = [];

describe("/questionnaire routes", () => {
  beforeAll(async () => {
    const client = await connect(process.env.TEST_DB_URL).catch(console.dir);
    await client.connect();
    const database = client.db("dnp-test");
    questionnairesCollection = database.collection("questionnaires");
    questionnaireService = new QuestionnaireService(questionnairesCollection);

    labelsCollection = database.collection("labels");
    labelService = new LabelService(labelsCollection);

    templatesCollection = database.collection("templates");
    templateService = new TemplateService(templatesCollection);

    emailController = new EmailController();

    questionnaireController = new QuestionnaireController(
      questionnaireService,
      templateService,
      labelService,
      emailController
    );
    QuestionnairesRouter(app, questionnaireController, questionnaireService);
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
    await Promise.all(
      labelsToDelete.map((labelId) =>
        labelsCollection.deleteOne({ _id: labelId })
      )
    );
  });

  // create a template in the db
  // use the api to generate a new questionnaire
  // make sure it created questionnaire in the db
  it("can create a new questionnaire", async () => {
    const title = "Albert";
    const newTemplate = await templateService.addTemplate(dummyTemplate());
    templatesToDelete.push(newTemplate.insertedId);
    const response = await request(app)
      .post(`/questionnaires/new`)
      .send({
        id: newTemplate.insertedId,
        title: title,
        reason: "eh. bored.",
      })
      .expect(200);

    expect(response.body._id).toBeDefined();

    const id = new ObjectID(response.body._id);
    questionnairesToDelete.push(id);
    const foundQuestionnaire = questionnaireService.getQuestionnaire(id);

    expect(foundQuestionnaire).toBeDefined();
  });

  // create a template in the db
  // use the api to generate a new questionnaire
  // make sure it created questionnaire in the db
  it("wont create a new questionnaire without a reason", async () => {
    const name = "Albert";
    const newTemplate = await templateService.addTemplate(dummyTemplate());
    templatesToDelete.push(newTemplate.insertedId);
    const response = await request(app)
      .post(`/questionnaires/new`)
      .send({
        id: newTemplate.insertedId,
        title: name,
      })
      .expect(400);
  });

  // start an imaginary template through the api
  it("wont find an imaginary template", (done) => {
    request(app)
      .post(`/questionnaires/new`)
      .send({
        id: "baddabbaddabbaddabbaddab",
        title: "asdfasdfasdf",
        reason: "noneeeeeee",
      })
      .expect(404, done);
  });

  // create a questionnaire
  // insert it with the service
  // use the app to find it
  // make sure the ids match up
  it("can find an existing questionnaire", async () => {
    const dummyQuestionnaire = dummyTemplate();
    dummyQuestionnaire.dnpId = "cest moi";
    const newQuestionnaire = await questionnaireService.addQuestionnaire(
      dummyQuestionnaire
    );
    questionnairesToDelete.push(newQuestionnaire.insertedId);

    const response = await request(app)
      .get(`/questionnaires/${dummyQuestionnaire.dnpId}`)
      .expect(200);
    const id = new ObjectID(response.body._id);

    expect(id).toEqual(newQuestionnaire.insertedId);
  });

  // create a questionnaire
  // use the api to save a new version of it
  // make sure the database has the new version
  // and bumped the schema_version
  it("can save a questionnaire", async () => {
    const schema_version = 3;
    const questionnaire = dummyQuestionnaire();
    questionnaire.schema_version = schema_version;
    questionnaire.dnpId = "cest moi";
    const newQuestionnaire = await questionnaireService.addQuestionnaire(
      questionnaire
    );
    questionnairesToDelete.push(newQuestionnaire.insertedId);
    const foundQuestionnaire = await questionnaireService.getQuestionnaire(
      newQuestionnaire.insertedId
    );

    const response = await request(app)
      .post(`/questionnaires/${foundQuestionnaire.dnpId}/update`)
      .send(foundQuestionnaire)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    const _id = new ObjectID(response.body._id);
    questionnairesToDelete.push(_id);
    const savedQuestionnaire = await questionnaireService.getQuestionnaire(_id);
    expect(savedQuestionnaire).toBeDefined();
    expect(savedQuestionnaire.dnpId).toBe(questionnaire.dnpId);
    expect(savedQuestionnaire.schema_version).toBe(schema_version + 1);
  });

  it("will not edit a questionniare with an approved label", async () => {
    let questionnaire = dummyQuestionnaire();
    questionnaire.dnpId = "gonna approve this one";

    const label = await labelService.addLabel({
      ...questionnaire,
      status: "APPROVED",
      _id: Math.random(),
    });
    expect(label).toBeDefined();
    labelsToDelete.push(label.insertedId);

    const response = await request(app)
      .post(`/questionnaires/${questionnaire.dnpId}/update`)
      .send(questionnaire)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(405);
  });

  it("will not edit a questionniare with an in review label", async () => {
    let questionnaire = dummyQuestionnaire();
    questionnaire.dnpId = "gonna 'in review' this one for testing";

    const label = await labelService.addLabel({
      ...questionnaire,
      status: "IN REVIEW",
      _id: Math.random(),
    });
    expect(label).toBeDefined();
    labelsToDelete.push(label.insertedId);

    const response = await request(app)
      .post(`/questionnaires/${questionnaire.dnpId}/update`)
      .send(questionnaire)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(405);
  });
});

const dummyTemplate = () => ({
  questions: ["what say you?"],
});

const dummyQuestionnaire = () => ({
  questionnaire: ["testing123"],
  _id: "testing123",
  schema_version: 3,
  title: "testing123",
  reason: "testing123",
  dnpId: "testing123",
  savedDate: "testing123",
});
