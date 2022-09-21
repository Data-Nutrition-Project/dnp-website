const { body, validationResult } = require("express-validator");

exports.FilesRouter = (app) => {
  app.post("/file/upload", async (req, res) => {
    try {
      const { questionnaire } = req.body;
      const template = {
        questionnaire,
      };

      const newTemplate = await templateService.addTemplate(template);
      template._id = newTemplate.insertedId;

      res.status(200).send(template);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: `Server error creating Template`,
        error: err,
      });
    }
  });
};
