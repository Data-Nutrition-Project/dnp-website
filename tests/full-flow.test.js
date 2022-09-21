require("dotenv").config();
jest.mock("../controllers/email.js");

const { ObjectID } = require("mongodb");

const { connect } = require("../database/connector.js");

const { TemplateService } = require("../database/template.js");
const { TemplatesRouter } = require("../routes/template.js");

const { QuestionnaireService } = require("../database/questionnaire.js");
const { QuestionnaireController } = require("../controllers/questionnaire.js");
const { QuestionnairesRouter } = require("../routes/questionnaire.js");

const { LabelService } = require("../database/label.js");
const { LabelController } = require("../controllers/label.js");
const { LabelsRouter } = require("../routes/label.js");

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
let labelController;

let questionnaireController;

let emailController;

const templatesToDelete = [];
const questionnairesToDelete = [];
const labelsToDelete = [];

describe("DNP API", () => {
  beforeAll(async () => {
    const client = await connect(process.env.TEST_DB_URL).catch(console.dir);
    await client.connect();
    const database = client.db("dnp-test");

    templatesCollection = database.collection("templates");
    questionnairesCollection = database.collection("questionnaires");

    labelsCollection = database.collection("labels");
    labelService = new LabelService(labelsCollection);

    emailController = new EmailController();

    templateService = new TemplateService(templatesCollection);
    questionnaireService = new QuestionnaireService(questionnairesCollection);
    questionnaireController = new QuestionnaireController(
      questionnaireService,
      templateService,
      labelService
    );
    labelController = new LabelController(
      labelService,
      questionnaireService,
      emailController
    );

    QuestionnairesRouter(app, questionnaireController, questionnaireService);
    TemplatesRouter(app, templateService);
    LabelsRouter(app, labelController, labelService);
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

  // create a template with post
  // find it using get
  // start a questionnaire with that template
  // save it 2 times with post
  // get the max version with get
  it("can go through the flow of templates and questionnaires", async () => {
    //
    // we need a template to start off with
    //
    const dummy = dummyTemplate();
    const templateResponse = await request(app)
      .post("/templates/new")
      .send(dummy)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
    const templateId = new ObjectID(templateResponse.body._id);
    templatesToDelete.push(templateId);

    // make sure we can find it in the db
    const foundTemplate = await request(app)
      .get(`/templates/${templateResponse.body._id}`)
      .expect(200);
    expect(foundTemplate).toBeDefined();
    expect(foundTemplate.body).toEqual(templateResponse.body);

    //
    // start a new empty questionnaire with that template
    //
    const newQuestionnaireResponse = await request(app)
      .post(`/questionnaires/new`)
      .send({
        id: foundTemplate.body._id,
        title: "HG's cool data again",
        reason: "I wanted to! So I did.",
      })
      .expect(200);
    const newQuestionnaireId = new ObjectID(newQuestionnaireResponse.body._id);
    questionnairesToDelete.push(newQuestionnaireId);

    // make sure we can find the new questionnaire in the db
    const foundNewQuestionnaire = await request(app)
      .get(`/questionnaires/${newQuestionnaireResponse.body.dnpId}`)
      .expect(200);
    const workingQuestionnaire = foundNewQuestionnaire.body;
    expect(workingQuestionnaire.schema_version).toBe(0);
    expect(workingQuestionnaire.questionnaire).toBeDefined();
    expect(workingQuestionnaire._id).toBeDefined();
    expect(workingQuestionnaire.title).toBeDefined();
    expect(workingQuestionnaire.reason).toBeDefined();
    expect(workingQuestionnaire.dnpId).toBeDefined();
    expect(workingQuestionnaire.savedDate).toBeDefined();

    //
    // let's fill out some questions
    //
    workingQuestionnaire.questionnaire.push("I think, there for I am?");
    const firstSavedQuestionnaireResponse = await request(app)
      .post(`/questionnaires/${workingQuestionnaire.dnpId}/update`)
      .send(workingQuestionnaire) // not so empty anymore
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
    const firstSavedId = new ObjectID(firstSavedQuestionnaireResponse.body._id);
    questionnairesToDelete.push(firstSavedId);
    expect(firstSavedQuestionnaireResponse.body.schema_version).toBe(1);
    // need to update our model to keep track of important info the api tells us
    workingQuestionnaire._id = firstSavedId;
    workingQuestionnaire.schema_version =
      firstSavedQuestionnaireResponse.body.schema_version;

    // lets do that again
    workingQuestionnaire.questionnaire.push(
      "All we are, is dust in the wind, dude?"
    );
    const secondSavedQuestionnaireResponse = await request(app)
      .post(`/questionnaires/${workingQuestionnaire.dnpId}/update`)
      .send(workingQuestionnaire) // not so empty anymore
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
    const secondSavedId = new ObjectID(
      secondSavedQuestionnaireResponse.body._id
    );
    questionnairesToDelete.push(secondSavedId);
    expect(secondSavedQuestionnaireResponse.body.schema_version).toBe(2);

    // need to update our model to keep track of important info the api tells us
    workingQuestionnaire._id = secondSavedId;
    workingQuestionnaire.schema_version =
      secondSavedQuestionnaireResponse.body.schema_version;

    //
    // now lets find the most recent version in our database
    //
    const newestQuestionnaireResponse = await request(app)
      .get(`/questionnaires/${newQuestionnaireResponse.body.dnpId}`)
      .expect(200);
    expect(newestQuestionnaireResponse.body.schema_version).toBe(2);

    //
    // We are ready to submit!
    //
    const questionnaireToBeSubmitted = newestQuestionnaireResponse.body;
    const submittionResults = await request(app)
      .post(`/labels/submit`)
      .send(questionnaireToBeSubmitted)
      .expect(200);
    labelsToDelete.push(new ObjectID(submittionResults.body._id));

    expect(submittionResults.body.status).toBe("IN REVIEW");
    const submittedLabel = submittionResults.body;

    // the saving needs to be locked while in review
    await request(app)
      .post(`/questionnaires/${questionnaireToBeSubmitted.dnpId}/update`)
      .send(questionnaireToBeSubmitted)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(405);

    //
    // Ah it turns out we need to make changes
    //
    const needsChangesResponse = await request(app)
      .post(`/labels/${submittedLabel.dnpId}/changes`)
      .send({ password: process.env.ADMIN_PASSWORD })
      .expect(200);
    labelsToDelete.push(new ObjectID(needsChangesResponse.body._id));
    expect(needsChangesResponse.body.status).toBe("CHANGES REQUESTED");

    // this is our change
    questionnaireToBeSubmitted.questionnaire.push(
      "Okay, maybe this is better?"
    );
    const changedQuestionnaireResults = await request(app)
      .post(`/questionnaires/${questionnaireToBeSubmitted.dnpId}/update`)
      .send(questionnaireToBeSubmitted)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
    questionnairesToDelete.push(
      new ObjectID(changedQuestionnaireResults.body._id)
    );
    const changedQuestionnaire = changedQuestionnaireResults.body;

    //
    // Submitting again
    //
    const submittionResultsTwo = await request(app)
      .post(`/labels/submit`)
      .send(changedQuestionnaire)
      .expect(200);
    expect(submittionResultsTwo.body._id).toBeDefined();
    labelsToDelete.push(new ObjectID(submittionResultsTwo.body._id));
    expect(submittionResultsTwo.body.status).toBe("IN REVIEW");

    // the saving needs to be locked while in review (again)
    await request(app)
      .post(`/questionnaires/${changedQuestionnaire.dnpId}/update`)
      .send(changedQuestionnaire)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(405);

    //
    // Ah it turns out we need to make changes (again)
    //
    const needsChangesResponseTwo = await request(app)
      .post(`/labels/${submittedLabel.dnpId}/changes`)
      .send({ password: process.env.ADMIN_PASSWORD })
      .expect(200);
    labelsToDelete.push(new ObjectID(needsChangesResponseTwo.body._id));
    expect(needsChangesResponseTwo.body.status).toBe("CHANGES REQUESTED");

    // this is our second change requested
    changedQuestionnaire.questionnaire.push("How much more?");
    const changedQuestionnaireResultsTwo = await request(app)
      .post(`/questionnaires/${questionnaireToBeSubmitted.dnpId}/update`)
      .send(questionnaireToBeSubmitted)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
    questionnairesToDelete.push(
      new ObjectID(changedQuestionnaireResultsTwo.body._id)
    );
    const changedQuestionnaireTwo = changedQuestionnaireResultsTwo.body;

    const submittionResultsFinal = await request(app)
      .post(`/labels/submit`)
      .send(changedQuestionnaireTwo)
      .expect(200);
    expect(submittionResultsFinal.body._id).toBeDefined();
    labelsToDelete.push(new ObjectID(submittionResultsFinal.body._id));
    expect(submittionResultsFinal.body.status).toBe("IN REVIEW");

    const approvedResponse = await request(app)
      .post(`/labels/${submittedLabel.dnpId}/approve`)
      .send({ password: process.env.ADMIN_PASSWORD })
      .expect(200);
    labelsToDelete.push(new ObjectID(approvedResponse.body._id));
    expect(approvedResponse.body.status).toBe("APPROVED");

    // the saving needs to be locked after an approval
    await request(app)
      .post(`/questionnaires/${changedQuestionnaireTwo.dnpId}/update`)
      .send(changedQuestionnaireTwo)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(405);
  });
});

const dummyTemplate = () => ({
  questionnaire: ["what say you?"],
});
