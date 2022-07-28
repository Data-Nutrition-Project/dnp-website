require("dotenv").config();
const { ObjectID } = require("mongodb");

const { connect } = require("../database/connector.js");
const { TemplateService } = require("../database/template.js");
const { TemplatesRouter } = require("../routes/template.js");

const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());

let templateService;
let templatesCollection;
const templatesToDelete = [];

describe("/template routes", () => {
  beforeAll(async () => {
    const client = await connect(process.env.TEST_DB_URL).catch(console.dir);
    await client.connect();
    const database = client.db("dnp-test");
    templatesCollection = database.collection("templates");

    templateService = new TemplateService(templatesCollection);
    TemplatesRouter(app, templateService);
  });

  // we want to cleanup all the things we inserted afterwards
  afterAll(async () => {
    await Promise.all(
      templatesToDelete.map((templateId) =>
        templatesCollection.deleteOne({ _id: templateId })
      )
    );
  });

  it("denies an invalid template", (done) => {
    request(app)
      .post("/template")
      .send({ arco: "iris" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(400, done);
  });

  it("adds to the database with POST", async () => {
    const dummy = dummyTemplate();

    const response = await request(app)
      .post("/template")
      .send(dummy)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(response.body._id).toBeDefined();
    expect(response.body.questionnaire).toBeDefined();

    const _id = new ObjectID(response.body._id);
    templatesToDelete.push(_id);

    const foundTemplate = await templateService.getTemplate(_id);

    expect(foundTemplate._id).toEqual(_id);
    expect(foundTemplate.questions).toEqual(dummy.questions);
  });

  it("gets an existing one with GET", async () => {
    const dummy = dummyTemplate();
    const addedTemplate = await templateService.addTemplate(dummy);
    templatesToDelete.push(addedTemplate.insertedId);

    const foundTemplate = await templateService.getTemplate(
      addedTemplate.insertedId
    );
    expect(foundTemplate._id).toEqual(addedTemplate.insertedId);
    expect(foundTemplate.questions).toEqual(dummy.questions);

    const response = await request(app)
      .get(`/template?id=${addedTemplate.insertedId}`)
      .expect(200);

    expect(response.body.questionnaire).toStrictEqual(dummy.questionnaire);
  });

  it("gets the most recent template with GET", async () => {
    const dummy = dummyTemplate();
    const addedTemplate = await templateService.addTemplate(dummy);
    templatesToDelete.push(addedTemplate.insertedId);

    const dummy2 = dummyTemplate();
    const addedTemplate2 = await templateService.addTemplate(dummy2);
    templatesToDelete.push(addedTemplate2.insertedId);

    const dummy3 = dummyTemplate();
    const addedTemplate3 = await templateService.addTemplate(dummy3);
    templatesToDelete.push(addedTemplate3.insertedId);

    const response = await request(app).get(`/template`).expect(200);

    expect(response.body._id).toEqual(addedTemplate3.insertedId.toString());
    expect(response.body._id).not.toEqual(addedTemplate.insertedId.toString());
  });

  it("wont find an imaginary template", (done) => {
    request(app).get(`/template?id=baddabbaddabbaddabbaddab`).expect(404, done);
  });

  it("can insert with POST and find with GET", async () => {
    const dummy = dummyTemplate();

    const responsePost = await request(app)
      .post("/template")
      .send(dummy)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(responsePost.body._id).toBeDefined();
    expect(responsePost.body.questionnaire).toBeDefined();

    const _id = new ObjectID(responsePost.body._id);
    templatesToDelete.push(_id);

    const responseGet = await request(app)
      .get(`/template?id=${responsePost.body._id}`)
      .expect(200);

    expect(responseGet.body.questionnaire).toStrictEqual(dummy.questionnaire);
  })
});

const dummyTemplate = () => ({
  questionnaire: ["how much chuck could a would chuck chuck?"],
});
