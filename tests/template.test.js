require("dotenv").config();
const { ObjectID } = require("mongodb");

const { connect } = require("../database/connector.js");
const { TemplateService } = require("../database/template.js");

let templatesCollection;
let templateService;
const templatesToDelete = [];

describe("templates service", () => {
  // connect to our database at the beginning
  beforeAll(async () => {
    const client = await connect(process.env.TEST_DB_URL).catch(console.dir);
    await client.connect();
    const database = client.db("dnp-test");
    templatesCollection = database.collection("templates");
    templateService = new TemplateService(templatesCollection);
  });

  // we want to cleanup all the things we inserted afterwards
  afterAll(async () => {
    await Promise.all(
      templatesToDelete.map((templateId) =>
        templatesCollection.deleteOne({ _id: templateId })
      )
    );
  });

  // add a template with our methods
  // look for it in the db
  // confirm it was there :)
  it("can add a new template", async () => {
    const templateToAdd = dummyTemplate();
    const template = await templateService.addTemplate(templateToAdd);
    templatesToDelete.push(template.insertedId);

    const readTemplates = await templatesCollection.find().toArray();
    const foundTemplate = readTemplates.find(
      (e) => e._id.toString() == template.insertedId.toString()
    );
    expect(foundTemplate).toEqual(templateToAdd);
  });

  // add a template into our database
  // use our method to find it
  // assert they are the same
  it("can find an existing template", async () => {
    const templateToAdd = dummyTemplate();
    const template = await templatesCollection.insertOne(templateToAdd);
    templatesToDelete.push(template.insertedId);

    const foundTemplate = await templateService.getTemplate(
      template.insertedId
    );
    expect(foundTemplate).toEqual(templateToAdd);
  });

  // add a template into our database
  // use our method to find it
  // assert they are the same
  it("can find the newest template", async () => {
    const templateToAdd = dummyTemplate();
    const template = await templatesCollection.insertOne(templateToAdd);
    templatesToDelete.push(template.insertedId);

    const templateToAdd2 = dummyTemplate();
    const template2 = await templatesCollection.insertOne(templateToAdd2);
    templatesToDelete.push(template2.insertedId);

    const foundTemplate = await templateService.getNewestTemplate();
    expect(foundTemplate._id).toEqual(templateToAdd2._id);
    expect(foundTemplate._id).not.toEqual(templateToAdd._id);
  });

  // look for a made up template id
  // confirm that it is null
  it("will not find a made up template", async () => {
    const foundTemplate = await templateService.getTemplate(
      "aqui, la cuenta es pequena, los desserts son grande"
    );
    expect(foundTemplate).toEqual(null);
  });
});

const dummyTemplate = () => ({
  questionnaire: [],
});
