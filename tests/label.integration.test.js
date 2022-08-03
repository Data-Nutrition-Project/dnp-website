require("dotenv").config();
const { ObjectID } = require("mongodb");

const { connect } = require("../database/connector.js");
const { TemplateService } = require("../database/template.js");
const { QuestionnaireService } = require("../database/questionnaire.js");
const { QuestionnaireController } = require("../controllers/questionnaire.js");
const { LabelService } = require("../database/label.js");
const { LabelController } = require("../controllers/label.js");
const { LabelsRouter } = require("../routes/label.js");

const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());

let templateService;
let templatesCollection;

let questionnaireService;
let questionnairesCollection;
let questionnaireController;

let labelService;
let labelsCollection;
let labelController;

const labelsToDelete = [];
const questionnairesToDelete = [];

describe("/label routes", () => {
  beforeAll(async () => {
    const client = await connect(process.env.TEST_DB_URL).catch(console.dir);
    await client.connect();
    const database = client.db("dnp-test");
    templatesCollection = database.collection("templates");
    questionnairesCollection = database.collection("questionnaires");
    labelsCollection = database.collection("labels");

    templateService = new TemplateService(templatesCollection);
    questionnaireService = new QuestionnaireService(questionnairesCollection);
    labelService = new LabelService(labelsCollection);

    questionnaireController = new QuestionnaireController(
      questionnaireService,
      templateService,
      labelService
    );

    labelController = new LabelController(labelService, questionnaireService);

    LabelsRouter(app, labelController, labelService);
  });

  // we want to cleanup all the things we inserted afterwards
  afterAll(async () => {
    await Promise.all(
      labelsToDelete.map((labelId) =>
        labelsCollection.deleteOne({ _id: labelId })
      )
    );
    await Promise.all(
      questionnairesToDelete.map((questionnaireId) =>
        questionnairesCollection.deleteOne({ _id: questionnaireId })
      )
    );
  });

  // create a label
  // insert it with the service
  // use the app to find it
  // make sure the ids match up
  it("can find an existing label", async () => {
    const dummyLabel = dummyQuestionnaire();
    dummyLabel.dnpId = "c'est moi";
    const newLabel = await labelController.saveLabel(dummyLabel);
    expect(newLabel).toBeDefined();
    expect(newLabel.dnpId).toBe(dummyLabel.dnpId);
    expect(newLabel._id).toBeDefined();

    labelsToDelete.push(newLabel._id);

    const response = await request(app)
      .get(`/label?id=${dummyLabel.dnpId}`)
      .expect(200);
    const id = new ObjectID(response.body._id);

    expect(id).toEqual(newLabel._id);
  });

  // create a label
  // insert it with the service
  // use the app to find it
  // make sure the ids match up
  it("can't find a non-existant label", (done) => {
    request(app).get(`/label?id=hgeezy`).expect(404, done);
  });

  it("can submit a label", async () => {
    const dummy = dummyQuestionnaire();
    dummy.dnpId = "c'est moi aussi";
    const newQuestionnaire = await questionnaireController.saveQuestionnaire(
      dummy
    );
    questionnairesToDelete.push(newQuestionnaire._id);

    const response = await request(app)
      .post(`/label/submit`)
      .send(newQuestionnaire)
      .expect(200);

    expect(response.body).toBeDefined();

    const foundLabel = await labelService.getNewestLabel(
      newQuestionnaire.dnpId
    );
    labelsToDelete.push(foundLabel._id);

    expect(foundLabel.status).toBe("IN REVIEW");
  });

  it("can approve a label", async () => {
    const dummyQuestionnaire = {
      version: 444,
      questions: ["what say you?"],
      status: "thinking about it",
      name: "Jimmy",
    };
    dummyQuestionnaire.dnpId = "it'sa me";

    const newQuestionnaire = await questionnaireController.saveQuestionnaire(
      dummyQuestionnaire
    );
    questionnairesToDelete.push(newQuestionnaire._id);

    const newLabel = await labelController.saveLabel(newQuestionnaire);
    labelsToDelete.push(newLabel._id);

    const response = await request(app)
      .post(`/label/approve?id=${newQuestionnaire.dnpId}`)
      .expect(200);

    expect(response.body).toBeDefined();

    const foundLabel = await labelService.getNewestLabel(
      newQuestionnaire.dnpId
    );

    expect(foundLabel.status).toBe("APPROVED");

    labelsToDelete.push(foundLabel._id);
  });

  it("can request changes for a label", async () => {
    const dummyQuestionnaire = {
      version: 444,
      questions: ["what say you?"],
      status: "thinking about it",
      name: "Jimmy",
    };
    dummyQuestionnaire.dnpId = "it'sa me again";
    const newQuestionnaire = await questionnaireController.saveQuestionnaire(
      dummyQuestionnaire
    );
    questionnairesToDelete.push(newQuestionnaire._id);

    const newLabel = await labelController.saveLabel(newQuestionnaire);
    labelsToDelete.push(newLabel._id);

    const response = await request(app)
      .post(`/label/changes?id=${newQuestionnaire.dnpId}`)
      .expect(200);

    expect(response.body).toBeDefined();
    const foundLabel = await labelService.getNewestLabel(
      newQuestionnaire.dnpId
    );

    expect(foundLabel.status).toBe("CHANGES REQUESTED");

    labelsToDelete.push(foundLabel._id);
  });
});

const dummyQuestionnaire = () => ({
  questionnaire: ["testing1234"],
  _id: "testing1234",
  schema_version: 3,
  title: "testing1234",
  reason: "testing1234",
  dnpId: "testing1234",
  savedDate: "testing1234",
});
