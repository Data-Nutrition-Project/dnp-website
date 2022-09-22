const { ObjectID } = require("mongodb");
const { body, validationResult } = require("express-validator");

exports.LabelsRouter = (app, labelController, labelService) => {
  /*
  @params
    dnpId :: queryParams - dnp id of a label to be gotten
  @desc
    This route will accept a dnp id of a label and return the highest
      version that is available in the database
  @return
    label :: label that has the given dnpId and the highest version
      it will have the following fields:
        { _id, status, version, labelReason, questionnaire, title, dnpId, schema_version }
  */
  app.get("/labels/:id", async (req, res) => {
    try {
      const foundLabel = await labelService.getNewestLabel(req.params.id);
      if (!foundLabel) {
        res.status(404).send({
          message: `Could not find Label`,
        });
      } else {
        res.status(200).send(foundLabel);
      }
    } catch (err) {
      res.status(500).send({
        message: `Server error getting Label`,
        error: err,
      });
    }
  });

  /*
  @desc
    This route will return a list of all approved labels
  @return
    list of labels ::
        [{ _id }, {_id }, ...]
  */
  app.get("/labels/approved", async (req, res) => {
    try {
      const foundLabel = await labelService.getApprovedLabels();
      if (!foundLabel) {
        res.status(404).send({
          message: `Could not find Label`,
        });
      } else {
        res.status(200).send(foundLabel);
      }
    } catch (err) {
      res.status(500).send({
        message: `Server error getting Label`,
        error: err,
      });
    }
  });

  /*
  @params
    TBD
  @desc
    TBD
  @return
    TBD
  */
  app.post(
    "/labels/submit",
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
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const results = await labelController.submitLabel(req.body);
        if (!results) {
          res.status(405).send({
            message: `Could not save Label`,
          });
        }
        res.status(200).send(results);
      } catch (err) {
        console.log(err)
        res.status(500).send({
          message: `Server error submitting Label`,
          error: err,
        });
      }
    }
  );

  /*
  @params
    dnpId :: queryParams - dnp id of a label to be approved
  @desc
    Approve a label based on a dnp id, a questionnaire needs to exist
  @return
    TBD
  */
  app.post(
    "/labels/:id/approve",
    body("password").exists(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (req.body.password != process.env.ADMIN_PASSWORD) {
        return res.status(401).send({
          message: `Incorrect password`,
        });
      }

      try {
        const results = await labelController.approveLabel(req.params.id);
        if (!results) {
          res.status(405).send({
            message: `Could not approve Label`,
          });
        } else {
          res.status(200).send(results);
        }
      } catch (err) {
        res.status(500).send({
          message: `Server error approving Label`,
          error: err,
        });
      }
    }
  );

  /*
  @params
    dnpId :: queryParams - dnp id of a label to be approved
  @desc
    Approve a label based on a dnp id, a questionnaire needs to exist
  @return
    TBD
  */
  app.post(
    "/labels/:id/changes",
    body("password").exists(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (req.body.password != process.env.ADMIN_PASSWORD) {
        return res.status(401).send({
          message: `Incorrect password`,
        });
      }

      try {
        const results = await labelController.requestChangesForLabel(
          req.params.id
        );
        if (!results) {
          res.status(405).send({
            message: `Could not request changes for Label`,
          });
        } else {
          res.status(200).send(results);
        }
      } catch (err) {
        console.log(err);
        res.status(500).send({
          message: `Server error requesting changes for Label`,
          error: err,
        });
      }
    }
  );
};
