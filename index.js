require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { connect } = require("./database/connector.js");
const { TemplateService } = require("./database/template.js");
const { TemplatesRouter } = require("./routes/template.js");
const { QuestionnaireService } = require("./database/questionnaire.js");
const { QuestionnaireController } = require("./controllers/questionnaire.js");
const { LabelService } = require("./database/label.js");
const { LabelController } = require("./controllers/label.js");
const { QuestionnairesRouter } = require("./routes/questionnaire.js");
const { LabelsRouter } = require("./routes/label.js");

const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

const main = async () => {
  // big ol block of db logic, probably belongs elsewhere
  const client = await connect(process.env.DB_URL).catch(console.dir);
  await client.connect();
  console.log("Connected successfully to server");
  const database = client.db("dnp-api");
  const templatesCollection = database.collection("templates");
  const questionnairesCollection = database.collection("questionnaires");
  const labelsCollection = database.collection("labels");

  const templateService = new TemplateService(templatesCollection);
  const questionnaireService = new QuestionnaireService(
    questionnairesCollection
  );
  const labelService = new LabelService(labelsCollection);

  const questionnaireController = new QuestionnaireController(
    questionnaireService,
    templateService,
    labelService
  );
  const labelController = new LabelController(labelService, questionnaireService);

  TemplatesRouter(app, templateService);
  QuestionnairesRouter(app, questionnaireController, questionnaireService);
  LabelsRouter(app, labelController, labelService);

  app.listen(port, () => {
    console.log(`DNP API listening on port ${port}`);
  });
};

main();
