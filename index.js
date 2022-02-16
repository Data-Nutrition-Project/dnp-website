require('dotenv').config()

const express = require('express')
const cors = require('cors')

const { connect } = require('./database/connector.js')
const app = express()
const port = process.env.PORT

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(cors())

const main = async () => {

  const client = await connect(process.env.DB_URL);
  await client.connect();

  app.get('/hello', async (req, res) => {
    res.send({message: "hello!"});
  })

  app.get('/database', async (req, res) => {
    res.send({message: "database is connected!"});
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main();

// B^jPp8O7YB5JlrR&zmV
