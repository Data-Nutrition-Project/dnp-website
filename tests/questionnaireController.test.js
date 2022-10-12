require("dotenv").config();
jest.mock("../controllers/email.js");

const { ObjectID } = require("mongodb");

const { connect } = require("../database/connector.js");

const { TemplateService } = require("../database/template.js");

const { QuestionnaireService } = require("../database/questionnaire.js");
const { QuestionnaireController } = require("../controllers/questionnaire.js");

const { LabelService } = require("../database/label.js");

const { EmailController } = require("../controllers/email.js");

let templatesCollection;
let templateService;

let questionnairesCollection;
let questionnaireService;

let labelsCollection;
let labelService;

let questionnairesController;

let emailController;

const questionnairesToDelete = [];
const templatesToDelete = [];
const labelsToDelete = [];

describe("questionnaires controller", () => {
  // connect to our database at the beginning
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

    questionnairesController = new QuestionnaireController(
      questionnaireService,
      templateService,
      labelService,
      emailController
    );
  });

  // we want to cleanup all the things we inserted afterwards
  afterAll(async () => {
    await Promise.all(
      questionnairesToDelete.map((questionnaireId) =>
        questionnairesCollection.deleteOne({ _id: questionnaireId })
      )
    );
    await Promise.all(
      templatesToDelete.map((templateId) =>
        templatesCollection.deleteOne({ _id: templateId })
      )
    );
    await Promise.all(
      labelsToDelete.map((labelId) =>
        labelsCollection.deleteOne({ _id: labelId })
      )
    );
  });

  // create a new template
  // get a questionnaire from that id
  // affirm the return and the db make sense
  it("can start a new questionnaire", async () => {
    const title = "meh";
    const reason = "what do you want from me";

    const template = await templateService.addTemplate(dummyTemplate());
    templatesToDelete.push(template.insertedId);

    const newQuestionnaire =
      await questionnairesController.createQuestionnaireFromTemplate(
        template.insertedId,
        title,
        reason
      );
    questionnairesToDelete.push(newQuestionnaire._id);

    // make sure our return is correct
    expect(newQuestionnaire).toBeDefined();
    expect(newQuestionnaire._id).toBeDefined();
    expect(newQuestionnaire._id).not.toBe(template.insertedId);
    expect(newQuestionnaire.dnpId).toBeDefined();
    expect(newQuestionnaire.title).toBe(title);
    expect(newQuestionnaire.reason).toBe(reason);
    expect(newQuestionnaire.savedDate).toBeDefined();
    expect(newQuestionnaire.schema_version).toBe(0);

    // make sure out db feels the same way
    const questionnaire = await questionnaireService.getQuestionnaire(
      newQuestionnaire._id
    );
    expect(questionnaire).toBeDefined();
    expect(questionnaire._id).toBeDefined();
    expect(questionnaire.dnpId).toBeDefined();
    expect(questionnaire.savedDate).toBeDefined();
    expect(questionnaire.title).toBeDefined();
    expect(questionnaire.reason).toBeDefined();
    expect(questionnaire.schema_version).toBeDefined();
  });

  // create a new questionnaire
  // save it twice
  // make sure the schema version gets bumped
  it("can save a questionnaire properly with schema versioning", async () => {
    let questionnaire = dummyQuestionnaire();
    const schema_version = 0;
    questionnaire.schema_version = schema_version;
    // initial insert, like when a user starts a questionnaire
    const questionnaireInserted = await questionnaireService.addQuestionnaire(
      questionnaire
    );
    questionnairesToDelete.push(questionnaireInserted.insertedId);
    questionnaire._id = questionnaireInserted.insertedId;

    // they save for the first time
    const savedQuestionnaireOne =
      await questionnairesController.saveQuestionnaire(
        questionnaire.dnpId,
        questionnaire
      );
    questionnairesToDelete.push(savedQuestionnaireOne._id);

    const questionnaireOne = await questionnaireService.getQuestionnaire(
      savedQuestionnaireOne._id
    );

    // all fields need to be the same
    expect(questionnaireOne.title).toBe(savedQuestionnaireOne.title);
    expect(questionnaireOne.reason).toBe(savedQuestionnaireOne.reason);
    expect(questionnaireOne.questionnaire).toStrictEqual(
      savedQuestionnaireOne.questionnaire
    );
    expect(questionnaireOne.dnpId).toBe(savedQuestionnaireOne.dnpId);
    expect(questionnaireOne.savedDate).toBeDefined();
    expect(questionnaireOne.schema_version).toBe(schema_version + 1);
    // and we want a different one
    expect(questionnaireOne._id).not.toBe(questionnaire._id);

    // they save for the second time
    const savedQuestionnaireTwo =
      await questionnairesController.saveQuestionnaire(
        questionnaire.dnpId,
        questionnaire
      );
    questionnairesToDelete.push(savedQuestionnaireTwo._id);

    const questionnaireTwo = await questionnaireService.getQuestionnaire(
      savedQuestionnaireTwo._id
    );

    // all fields need to be the same
    expect(questionnaireTwo.title).toBe(savedQuestionnaireTwo.title);
    expect(questionnaireTwo.reason).toBe(savedQuestionnaireTwo.reason);
    expect(questionnaireTwo.questionnaire).toStrictEqual(
      savedQuestionnaireTwo.questionnaire
    );
    expect(questionnaireTwo.dnpId).toBe(savedQuestionnaireTwo.dnpId);
    expect(questionnaireTwo.savedDate).toBeDefined();
    expect(questionnaireTwo.schema_version).toBe(2);
    // and we want a different one
    expect(questionnaireTwo._id).not.toBe(questionnaire._id);
  });

  // look for a made up template id
  // confirm that it is null
  it("will not find a made up template", async () => {
    const foundTemplate =
      await questionnairesController.createQuestionnaireFromTemplate(
        "aqui, la cuenta es pequena, los desserts son grande"
      );
    expect(foundTemplate).toEqual(null);
  });

  it("will not edit a questionniare with an approved label", async () => {
    let questionnaire = dummyQuestionnaire();
    questionnaire.dnpId = "gonna approve this one";

    questionnaire.status = "APPROVED";
    const label = await labelService.addLabel(questionnaire);
    expect(label).toBeDefined();
    labelsToDelete.push(label.insertedId);

    const failedSave = await questionnairesController.saveQuestionnaire(
      questionnaire.dnpId,
      questionnaire
    );
    expect(failedSave).toBe(null);
  });

  it("will not edit a questionniare with an in review label", async () => {
    let questionnaire = dummyQuestionnaire();
    questionnaire.dnpId = "gonna 'in review' this one";

    questionnaire.status = "IN REVIEW";
    const label = await labelService.addLabel(questionnaire);
    expect(label).toBeDefined();
    labelsToDelete.push(label.insertedId);

    const failedSave = await questionnairesController.saveQuestionnaire(
      questionnaire.dnpId,
      questionnaire
    );
    expect(failedSave).toBe(null);
  });
});

const dummyQuestionnaire = () => ({
  schema_version: 0,
  questionnaire: [],
  dnpId: "super unique id here",
  reason: "well I guess this is good enough",
  title: "this is it",
});

const dummyTemplate = () => ({
  questionnaire: [],
});
