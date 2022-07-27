const { ObjectID } = require("mongodb");

exports.TemplatesRouter = (app, templateService) => {
  /*
  @params
    templateObject :: body - template that gets inserted into database
  @desc
    This route will accept a template through a POST body and insert it into
      the database after validating the attributes of the object
  @return
    idObject :: shaped like { id: _id }
  */
  app.post("/template", async (req, res) => {
    try {
      const template = templateService.validateTemplate(req.body);
      if (!template) {
        res.status(400).send({
          message: `Could not accept template :: ${req.body}`,
        });
      } else {
        const newTemplate = await templateService.addTemplate(template);

        res.status(200).send({
          id: newTemplate.insertedId,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error creating template`,
        error: err,
      });
    }
  });

  /*
  @params
    id :: queryParam - id of the template to be fetched from database
  @desc
    This route will take an id of a template and get it from the database
  @return
    templateObject - the template with the given _id
  */
  app.get("/template", async (req, res) => {
    try {
      let foundTemplate = null;

      if (req.query.id) {
        foundTemplate = await templateService.getTemplate(
          new ObjectID(req.query.id)
        );
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
