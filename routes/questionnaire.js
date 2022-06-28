const { ObjectID } = require('mongodb')
const { body, validationResult } = require('express-validator');

exports.QuestionnairesRouter = (app, questionnaireController, questionnaireService) => {
  /*
  @params
    questionnaireObject :: body - questionnaire that gets inserted into database
  @desc
    This route will accept a questionnaire through a POST body and insert it into
      the database after bumping the schema_version
  @return
    newQuestionnaire :: shaped like { id, schema_version, dnpId, questionnaire, etc. }
  */
  app.post('/questionnaire', 
    body('status').isString(),
    body('version').isNumeric(),
    async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const savedQuestionnaire = await questionnaireController.saveQuestionnaire(req.body)
      res.status(200)
        .send(savedQuestionnaire)
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
    name :: queryParams - name of the label given by the creator
    reason :: queryParams - reason for creating the label given by the creator
  @desc
    This route will accept a template id and will create and return an empty
      questionnaire object
  @return
    questionnaire :: empty questoinnaire, will have no schema_version which means
      it is new and empty
  */
  app.post('/new-questionnaire',
    body('id').exists().isLength({min: 20, max: 28}),
    body('title').exists().isLength({min: 1, max: 50}),
    body('reason').exists().isLength({min: 5, max: 5000}),
    async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const emptyTemplate = await questionnaireController
        .createQuestionnaireFromTemplate(new ObjectID(req.body.id), req.body.name, req.body.reason)

      if ( !emptyTemplate ) {
        res.status(400)
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
