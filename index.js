require('dotenv').config()

const express = require('express')
const cors = require('cors')

const { connect } = require('./database/connector.js')
const { TemplateService } = require('./database/template.js')
const { TemplatesRouter } = require('./routes/template.js')

const app = express()
const port = process.env.PORT

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())

const main = async () => {
  // big ol block of db logic, probably belongs elsewhere
  const client = await connect(process.env.DB_URL).catch(console.dir)
  await client.connect()
  console.log("Connected successfully to server");
  const database = client.db("dnp-api")
  const templatesCollection = database.collection("templates")

  const templateService = new TemplateService(templatesCollection)
  TemplatesRouter(app, templateService)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main();
