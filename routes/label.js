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
  app.get("/label", async (req, res) => {
    //try {
    const foundLabel = await labelService.getNewestLabel(req.query.id);
    if (!foundLabel) {
      res.status(404).send({
        message: `Could not find label with id :: ${req.query.id}`,
      });
    } else {
      res.status(200).send(foundLabel);
    }
    // } catch (err) {
    //   res.status(500).send({
    //     message: `Error getting label`,
    //     error: err,
    //   });
    // }
  });

  /*
  @params
    TBD
  @desc
    TBD
  @return
    TBD
  */
  app.post("/label/submit", async (req, res) => {
    //try {
    const results = await labelController.submitLabel(req.body);
    res.status(200).send(results);
    // } catch (err) {
    //   res.status(500).send({
    //     message: `Error submitting label`,
    //     error: err,
    //   });
    // }
  });

  /*
  @params
    dnpId :: queryParams - dnp id of a label to be approved
  @desc
    Approve a label based on a dnp id, a questionnaire needs to exist
  @return
    TBD
  */
  app.post("/label/approve", async (req, res) => {
    // try {
    const results = await labelController.approveLabel(req.query.id);
    if (!results) {
      res.status(404).send({
        message: `Could not approve label with id :: ${req.query.id}`,
      });
    } else {
      res.status(200).send(results);
    }
    // } catch (err) {
    //   res.status(500).send({
    //     message: `Error approving label`,
    //     error: err,
    //   });
    // }
  });

  /*
  @params
    dnpId :: queryParams - dnp id of a label to be approved
  @desc
    Approve a label based on a dnp id, a questionnaire needs to exist
  @return
    TBD
  */
  app.post("/label/changes", async (req, res) => {
    // try {
    const results = await labelController.requestChangesForLabel(req.query.id);
    if (!results) {
      res.status(404).send({
        message: `Could not request changes for label with id :: ${req.query.id}`,
      });
    } else {
      res.status(200).send(results);
    }
    // } catch (err) {
    //   res.status(500).send({
    //     message: `Error requesting changes label`,
    //     error: err,
    //   });
    // }
  });
};
