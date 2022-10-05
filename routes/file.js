const multer = require('multer');
const upload = multer();

exports.FilesRouter = (app, fileService) => {
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
  app.post(
    "/files/:id/:file",
    upload.any(),
    async (req, res) => {
      const dnpId = req.params.id;
      const fileName = req.params.file;
      const fileKey = `${dnpId}_${fileName}`;
      const body = req.files.find(d => d.fieldname == 'file').buffer
      console.log(body)
      try {
        const results = await fileService.uploadLabelUploadFile(fileKey, body)
        res.status(200).send(results);
      } catch (err) {
        console.log(err);
        res.status(500).send({
          message: `Server error saving file`,
          error: err,
        });
      }
    }
  );
};
