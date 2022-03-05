const { ObjectID } = require('mongodb')

exports.QuestionnairesRouter = (app, questionnaireController, questionnaireService) => {
  app.post('/questionnaire', async (req, res) => {
    try {
      const savedQuestionnaire = await questionnaireController.saveQuestionnaire(req.body)
      res.status(200)
        .send({
          id: savedQuestionnaire.insertedId
        })
    } catch ( err ) {
      res.status(500).send({
        message: `Error saving questionnaire`,
        error: err
      })
    }
  })

  app.get('/new-questionnaire', async (req, res) => {
    try {
      const emptyTemplate = await questionnaireController.getQuestionnaireFromTemplate(new ObjectID(req.query.id))

      if ( !emptyTemplate ) {
        res.status(404)
          .send({
            message: `Could not find template with id :: ${req.query.id}`
          })
      } else {
        res.status(200).send(emptyTemplate)
      }
    } catch ( err ) {
      res.status(500).send({
        message: `Error getting new questionnaire`,
        err: err
      })
    }
  })

  app.get('/questionnaire', async (req, res) => {
    try {
      const foundQuestionnaire = await questionnaireService.getNewestQuestionnaire(req.query.id)
      if ( !foundQuestionnaire ) {
        res.status(404)
          .send({
            message: `Could not find questionnaire with id :: ${req.query.id}`
          })
      } else {
        res.status(200).send(foundQuestionnaire)
      }
    } catch ( err ) {
      res.status(500).send({
        message: `Error getting questionnaire`,
        error: err
      })
    }
  })
}
