require("dotenv").config();
const { ObjectID } = require("mongodb");

const { connect } = require("../database/connector.js");

const { TemplateService } = require("../database/template.js");
const { QuestionnaireService } = require("../database/questionnaire.js");
const { LabelService } = require("../database/label.js");
const { QuestionnaireController } = require("../controllers/questionnaire.js");
const { LabelController } = require("../controllers/label.js");

let templatesCollection;
let templateService;

let questionnairesCollection;
let questionnaireService;
let questionnairesController;

let labelsCollection;
let labelService;
let labelsController;

const labelsToDelete = [];
const questionnairesToDelete = [];

describe("labels controller", () => {
  // connect to our database at the beginning
  beforeAll(async () => {
    const client = await connect(process.env.TEST_DB_URL).catch(console.dir);
    await client.connect();
    const database = client.db("dnp-test");

    templatesCollection = database.collection("templates");
    templateService = new TemplateService(templatesCollection);

    questionnairesCollection = database.collection("questionnaires");
    questionnaireService = new QuestionnaireService(questionnairesCollection);

    labelsCollection = database.collection("labels");
    labelService = new LabelService(labelsCollection);

    questionnairesController = new QuestionnaireController(
      questionnaireService,
      templateService,
      labelService
    );
    labelsController = new LabelController(labelService, questionnaireService);
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

  // create a new template
  // save it the first time without a version
  // save it again with the controller to initialize the version
  // save it third time to bump the version
  it("can save a label properly with schema versioning", async () => {
    // initial insert, like when a user starts a label
    const labelInserted = await labelService.addLabel(dummyLabel());
    const labelOne = await labelService.getLabel(labelInserted.insertedId);
    labelsToDelete.push(labelOne._id);
    expect(labelOne).toBeDefined();
    expect(labelOne.schema_version).toBe(1);

    // they save for the first time
    const savedLabelTwo = await labelsController.saveLabel(labelOne);
    const labelTwo = await labelService.getLabel(savedLabelTwo._id);
    labelsToDelete.push(labelTwo._id);
    expect(labelTwo).toBeDefined();
    expect(labelTwo.schema_version).toBeDefined();
    expect(labelTwo.schema_version).toBe(2);
    expect(labelTwo._id).not.toBe(labelOne._id); // we want a different one

    // they save for a second time
    const savedLabelThree = await labelsController.saveLabel(labelTwo);
    const labelThree = await labelService.getLabel(savedLabelThree._id);
    labelsToDelete.push(labelThree._id);
    expect(labelThree).toBeDefined();
    expect(labelThree.schema_version).toBeDefined();
    expect(labelThree.schema_version).toBe(3);
    expect(labelThree._id).not.toBe(labelTwo._id); // we want a different one
  });

  it("can submit a label from a questionnaire", async () => {
    const savedQuestionnaire = await questionnairesController.saveQuestionnaire(
      dummyQuestionnaire()
    );
    questionnairesToDelete.push(savedQuestionnaire._id);
    const submittedLabelResults = await labelsController.submitLabel(
      savedQuestionnaire
    );
    expect(submittedLabelResults).toBeDefined();

    const foundLabel = await labelService.getNewestLabel(
      savedQuestionnaire.dnpId
    );
    labelsToDelete.push(foundLabel._id);

    expect(foundLabel.status).toBe("IN REVIEW");
  });

  it("can approve a submitted label", async () => {
    const savedQuestionnaire = await questionnairesController.saveQuestionnaire(
      dummyQuestionnaire()
    );
    questionnairesToDelete.push(savedQuestionnaire._id);

    const submittedLabelResults = await labelsController.submitLabel(
      savedQuestionnaire
    );
    expect(submittedLabelResults).toBeDefined();
    expect(submittedLabelResults.schema_version).toBe(1);


    const foundLabelSubmitted = await labelService.getNewestLabel(
      savedQuestionnaire.dnpId
    );
    labelsToDelete.push(foundLabelSubmitted._id);

    const approvedLabelResults = await labelsController.approveLabel(
      savedQuestionnaire.dnpId
    );
    expect(approvedLabelResults).toBeDefined();
    expect(approvedLabelResults.schema_version).toBe(2);


    const foundLabelApproved = await labelService.getNewestLabel(
      savedQuestionnaire.dnpId
    );
    labelsToDelete.push(foundLabelApproved._id);

    expect(foundLabelApproved.status).toBe("APPROVED");
  });

  it("won't approve a non existant label", async () => {
    const savedQuestionnaire = await questionnairesController.saveQuestionnaire(
      dummyQuestionnaire()
    );
    questionnairesToDelete.push(savedQuestionnaire._id);
    const approvedLabelResults = await labelsController.approveLabel(
      savedQuestionnaire.dnpId
    );
    expect(approvedLabelResults).toBe(null);
  });

  it("won't approve a label without a paired questionnaire", async () => {
    const savedLabel = await labelsController.saveLabel(dummyQuestionnaire());
    labelsToDelete.push(savedLabel._id);
    const approvedLabelResults = await labelsController.approveLabel(
      savedLabel.dnpId
    );
    expect(approvedLabelResults).toBe(null);
  });

  it("can request changes for a submitted label", async () => {
    const savedQuestionnaire = await questionnairesController.saveQuestionnaire(
      dummyQuestionnaire()
    );
    questionnairesToDelete.push(savedQuestionnaire._id);

    const submittedLabelResults = await labelsController.submitLabel(
      savedQuestionnaire
    );
    expect(submittedLabelResults).toBeDefined();
    expect(submittedLabelResults.schema_version).toBe(1);


    const foundLabelSubmitted = await labelService.getNewestLabel(
      savedQuestionnaire.dnpId
    );
    labelsToDelete.push(foundLabelSubmitted._id);

    const requestedLabelResults = await labelsController.requestChangesForLabel(
      savedQuestionnaire.dnpId
    );
    expect(requestedLabelResults).toBeDefined();
    expect(requestedLabelResults.schema_version).toBe(2);


    const foundLabelRequested = await labelService.getNewestLabel(
      savedQuestionnaire.dnpId
    );
    labelsToDelete.push(foundLabelRequested._id);

    expect(foundLabelRequested.status).toBe("CHANGES REQUESTED");
  });

  it("won't request changes for a non existant label", async () => {
    const savedQuestionnaire = await questionnairesController.saveQuestionnaire(
      dummyQuestionnaire()
    );
    questionnairesToDelete.push(savedQuestionnaire._id);
    const requestedLabelResults = await labelsController.requestChangesForLabel(
      savedQuestionnaire.dnpId
    );
    expect(requestedLabelResults).toBe(null);
  });

  it("won't request changes for a label without a paired questionnaire", async () => {
    const savedLabel = await labelsController.saveLabel(dummyQuestionnaire());
    labelsToDelete.push(savedLabel._id);
    const requestedLabelResults = await labelsController.requestChangesForLabel(
      savedLabel.dnpId
    );
    expect(requestedLabelResults).toBe(null);
  });
});

const dummyLabel = () => ({
  version: 8675309,
  questionnaire: [],
  schema_version: 1,
  status: "APPROVED",
  reason: "big ups ya?",
  title: "Rob",
  savedDate: new Date(),
});

const dummyQuestionnaire = () => ({
  dnpId: Math.random(),
  questionnaire: [],
  reason: "big ups ya?",
  title: "Rob",
  savedDate: new Date(),
});
