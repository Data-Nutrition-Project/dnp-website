require("dotenv").config();
const { ObjectID } = require("mongodb");

const { connect } = require("../database/connector.js");
const { LabelService } = require("../database/label.js");

let labelsCollection;
let labelService;
const labelsToDelete = [];

describe("labels service", () => {
  // connect to our database at the beginning
  beforeAll(async () => {
    const client = await connect(process.env.TEST_DB_URL).catch(console.dir);
    await client.connect();
    const database = client.db("dnp-test");
    labelsCollection = database.collection("labels");
    labelService = new LabelService(labelsCollection);
  });

  // we want to cleanup all the things we inserted afterwards
  afterAll(async () => {
    await Promise.all(
      labelsToDelete.map((labelId) =>
        labelsCollection.deleteOne({ _id: labelId })
      )
    );
  });

  // add a label with our methods
  // look for it in the db
  // confirm it was there :)
  it("can add a new label", async () => {
    const labelToAdd = dummyLabel();
    const label = await labelService.addLabel(labelToAdd);
    labelsToDelete.push(label.insertedId);

    const readLabels = await labelsCollection.find().toArray();
    const foundLabel = readLabels.find(
      (e) => e._id.toString() == label.insertedId.toString()
    );
    expect(foundLabel).toEqual(labelToAdd);
  });

  // add a label into our database
  // use our method to find it
  // assert they are the same
  it("can find an existing label", async () => {
    const labelToAdd = dummyLabel();
    const label = await labelsCollection.insertOne(labelToAdd);
    labelsToDelete.push(label.insertedId);

    const foundLabel = await labelService.getLabel(label.insertedId);
    expect(foundLabel).toEqual(labelToAdd);
  });

  // add two labels into our database
  // use our method to find only an approved one
  // assert the draft label is not in the list
  it("can find all approved labels", async () => {
    const labelToAdd = dummyLabel();
    const label = await labelsCollection.insertOne(labelToAdd);
    labelsToDelete.push(label.insertedId);

    const approvedToAdd = dummyApprovedLabel();
    const approved = await labelsCollection.insertOne(approvedToAdd);
    labelsToDelete.push(approved.insertedId);

    const foundLabels = await labelService.getApprovedLabels();
    expect(foundLabels.length).toEqual(1);
    expect(foundLabels[0]).toEqual(approvedToAdd);
  });

  // look for a made up label id
  // confirm that it is null
  it("will not find a made up label", async () => {
    const foundLabel = await labelService.getLabel(
      "aqui, la cuenta es pequena, los desserts son grande"
    );
    expect(foundLabel).toEqual(null);
  });

  // insert one
  // insert another with a higher version
  // get the newest
  // make sure its the newest
  it("can get the newest schema_version", async () => {
    const dnpId = "1234 I declare thumb war";

    const labelToAdd1 = dummyLabel();
    labelToAdd1.schema_version = 4;
    labelToAdd1.dnpId = dnpId;
    const label1 = await labelsCollection.insertOne(labelToAdd1);
    labelsToDelete.push(label1.insertedId);

    const labelToAdd2 = dummyLabel();
    labelToAdd2.schema_version = 5;
    labelToAdd2.dnpId = dnpId;
    const label2 = await labelsCollection.insertOne(labelToAdd2);
    labelsToDelete.push(label2.insertedId);

    const labelToAdd3 = dummyLabel();
    labelToAdd3.dnpId = dnpId;
    const label3 = await labelsCollection.insertOne(labelToAdd3);
    labelsToDelete.push(label3.insertedId);

    const newestLabel = await labelService.getNewestLabel(dnpId);
    expect(newestLabel).toBeDefined();
    expect(newestLabel.schema_version).toBe(5);
  });
});

const dummyLabel = () => ({
  version: 1,
  questions: [],
  status: "IN REVIEW",
});

const dummyApprovedLabel = () => ({
  version: 1,
  questions: [],
  status: "APPROVED",
});
