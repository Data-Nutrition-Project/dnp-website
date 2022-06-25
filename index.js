require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { connect } = require('./database/connector.js')
const { TemplateService } = require('./database/template.js')
const { TemplatesRouter } = require('./routes/template.js')
const { QuestionnaireService } = require('./database/questionnaire.js')
const { QuestionnaireController } = require('./controllers/questionnaire.js')
const { QuestionnairesRouter } = require('./routes/questionnaire.js')

const app = express()
const port = process.env.PORT

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())
app.use(morgan('combined'))

const main = async () => {
  // big ol block of db logic, probably belongs elsewhere
  const client = await connect(process.env.DB_URL).catch(console.dir)
  await client.connect()
  console.log("Connected successfully to server");
  const database = client.db("dnp-api")
  const templatesCollection = database.collection("templates")
  const questionnairesCollection = database.collection("questionnaires")

  const templateService = new TemplateService(templatesCollection)
  const questionnaireService = new QuestionnaireService(questionnairesCollection)
  const questionnaireController = new QuestionnaireController(questionnaireService, templateService)

  TemplatesRouter(app, templateService)
  QuestionnairesRouter(app, questionnaireController, questionnaireService)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main();
