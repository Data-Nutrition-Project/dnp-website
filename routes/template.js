const { ObjectID } = require('mongodb')

exports.TemplatesRouter = (app, templateService) => {
  app.post('/template', async (req, res) => {
    console.log(req)
    res.send(req.body)
  })

  app.get('/template', async (req, res) => {
    try {
      const foundTemplate = await templateService.getTemplate(new ObjectID(req.query.id))
      if ( !foundTemplate ) {
        res.status(404).send({
          message: `Could not find template with id :: ${req.query.id}`
        })
      }
      else {
        res.status(200).send(foundTemplate)
      }
    }
    catch ( err ) {
      res.status(500).send({
        message: `Error getting template`,
        error: err
      })
    }
  })
}

//
// {"mess":
//   {"{\"version\":1,\"questions\":[],\"status\":\"draft\"}":""}}
