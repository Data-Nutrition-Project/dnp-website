require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(cors())

const main = async () => {
  app.get('/hello', async (req, res) => {
    res.send({message: "hello!"});
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main();
