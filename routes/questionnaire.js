const { ObjectID } = require('mongodb')

exports.QuestionnairesRouter = (app, questionnaireController, questionnaireService) => {
  /*
  @params
    questionnaireObject :: body - questionnaire that gets inserted into database
  @desc
    This route will accept a questionnaire through a POST body and insert it into
      the database after bumping the schema_version
  @return
    insertedObject :: shaped like { id: _id, schema_version }
  */
  app.post('/questionnaire', async (req, res) => {
    try {
      const savedQuestionnaire = await questionnaireController.saveQuestionnaire(req.body)
      res.status(200)
        .send({
          id: savedQuestionnaire.insertedId,
          schema_version: savedQuestionnaire.schema_version
        })
    } catch ( err ) {
      res.status(500).send({
        message: `Error saving questionnaire`,
        error: err
      })
    }
  })

  /*
  @params
    templateId :: queryParams - id of the template that you want to initialize
  @desc
    This route will accept a template id and will create and return an empty
      questionnaire object
  @return
    questionnaire :: empty questoinnaire, will have no schema_version which means
      it is new and empty
  */
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

  /*
  @params
    dnpId :: queryParams - dnp id of a questionnaire to be gotten
  @desc
    This route will accept a dnp id of a questionnaire and return the highest
      version that is available in the database
  @return
    questionnaire :: questionnaire that has the given dnpId and the highest version
  */
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
