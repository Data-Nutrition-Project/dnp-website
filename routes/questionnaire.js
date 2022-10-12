const { ObjectID } = require("mongodb");
const { body, validationResult } = require("express-validator");

exports.QuestionnairesRouter = (
  app,
  questionnaireController,
  questionnaireService
) => {
  /*
  @params
    questionnaireObject :: body - questionnaire that gets inserted into database
  @desc
    This route will accept a questionnaire through a POST body and insert it into
      the database after bumping the schema_version
  @return
    newQuestionnaire :: object
      shaped like { _id, schema_version, dnpId, questionnaire, reason, title, savedDate }
  */
  app.post(
    "/questionnaires/:id/update",
    body("questionnaire").isArray(),
    body("_id").isString(),
    body("schema_version").isNumeric(),
    body("title").isString(),
    body("reason").isString(),
    body("dnpId").isString(),
    body("savedDate").isString(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array(),
          message: "Invalid body for Questionnaire",
        });
      }

      try {
        const savedQuestionnaire =
          await questionnaireController.saveQuestionnaire(
            req.params.id,
            req.body
          );
        // TODO: handle 404 error here too
        if (!savedQuestionnaire) {
          res.status(405).send({
            message: `Could not save locked Questionnaire`,
          });
        } else {
          res.status(200).send(savedQuestionnaire);
        }
      } catch (err) {
        console.log(err);
        res.status(500).send({
          message: `Error saving Questionnaire`,
          error: err,
        });
      }
    }
  );

  /*
  @params
    templateId :: body - id of the template that you want to initialize
    title :: body - title of the label given by the creator
    reason :: body - reason for creating the label given by the creator
  @desc
    This route will accept a template id and will create and return an empty
      questionnaire object
  @return
    questionnaire :: empty questoinnaire, will have no schema_version which means
      it is new and empty; it will have the following fields:
        { _id, status, version, labelReason, questionnaire, title, dnpId }
  */
  app.post(
    "/questionnaires/new",
    body("id").exists().isLength({ min: 20, max: 28 }),
    body("title").exists().isLength({ min: 1, max: 100 }),
    body("reason").exists().isLength({ min: 5, max: 5000 }),
    async (req, res) => {
      // we need this to be casted to the right type, so mongo will accept it
      const mongoId = new ObjectID(req.body.id);
      const title = req.body.title;
      const reason = req.body.reason;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array(),
          message: "Invalid body for New Questionnaire",
        });
      }

      try {
        const emptyTemplate =
          await questionnaireController.createQuestionnaireFromTemplate(
            mongoId,
            title,
            reason
          );

        if (!emptyTemplate) {
          res.status(404).send({
            message: `Could not locate Template`,
          });
        } else {
          res.status(200).send(emptyTemplate);
        }
      } catch (err) {
        res.status(500).send({
          message: `Server error creating New Questionnaire`,
          error: err,
        });
      }
    }
  );

  /*
  @params
    dnpId :: queryParams - dnp id of a questionnaire to be gotten
  @desc
    This route will accept a dnp id of a questionnaire and return the highest
      version that is available in the database
  @return
    questionnaire :: questionnaire that has the given dnpId and the highest version
      it will have the following fields:
        { _id, status, version, labelReason, questionnaire, title, dnpId, schema_version }
  */
  app.get("/questionnaires/:id", async (req, res) => {
    try {
      const foundQuestionnaire =
        await questionnaireService.getNewestQuestionnaire(req.params.id);
      if (!foundQuestionnaire) {
        res.status(404).send({
          message: `Could not locate Questionnaire`,
        });
      } else {
        res.status(200).send(foundQuestionnaire);
      }
    } catch (err) {
      res.status(500).send({
        message: `Server error getting Questionnaire`,
        error: err,
      });
    }
  });

  // this 'saves the questionnaire'
  // user can click a button that saves it
  // but all this does is send them an email
  // since we update the questionnaire every few seconds
  app.post(
    "/questionnaires/:id/save",
    body("questionnaire").isArray(),
    body("_id").isString(),
    body("schema_version").isNumeric(),
    body("title").isString(),
    body("reason").isString(),
    body("dnpId").isString(),
    body("savedDate").isString(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array(),
          message: "Invalid body for Questionnaire",
        });
      }

      try {
        await questionnaireController.saveQuestionnairePlace(req.body);
        res.status(200).send(req.body);
      } catch (err) {
        console.log(err);
        res.status(500).send({
          message: `Error saving Questionnaire`,
          error: err,
        });
      }
    }
  );
};
