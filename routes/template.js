const { ObjectID } = require("mongodb");
const { body, validationResult } = require("express-validator");

exports.TemplatesRouter = (app, templateService) => {
  /*
  @params
    templateObject :: body - template that gets inserted into database
      shaped like { questionnaire: [] }
  @desc
    This route will accept a template through a POST body and insert it into
      the database
  @return
    newTemplateObject :: shaped like { _id, questionnaire }
  */
  app.post("/template", body("questionnaire").exists(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { questionnaire } = req.body;
      const template = {
        questionnaire,
      };

      const newTemplate = await templateService.addTemplate(template);
      template._id = newTemplate.insertedId;

      res.status(200).send(template);
    } catch (err) {
      res.status(500).send({
        message: `Error creating template`,
        error: err,
      });
    }
  });

  /*
  @params
    id :: queryParam (optional)
  @desc
    This route will accept an mongo id of a template and get it from the database,
      newest template if no id is provided
  @return
    templateObject :: shaped like { _id, questionnaire }
  */
  app.get("/template", async (req, res) => {
    try {
      let foundTemplate = null;

      if (req.query.id) {
        // mongo wont recognize the raw string
        const id = new ObjectID(req.query.id);
        foundTemplate = await templateService.getTemplate(id);
      } else {
        foundTemplate = await templateService.getNewestTemplate();
      }

      if (!foundTemplate) {
        res.status(404).send({
          message: `Could not find template with id :: ${req.query.id}`,
        });
      } else {
        res.status(200).send(foundTemplate);
      }
    } catch (err) {
      res.status(500).send({
        message: `Error getting template`,
        error: err,
      });
    }
  });
};
