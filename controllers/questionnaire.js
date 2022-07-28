const { v4: uuidv4 } = require("uuid");

class QuestionnaireController {
  constructor(questionnaireService, templateService) {
    this.questionnaireService = questionnaireService;
    this.templateService = templateService;
  }

  /*
  @params
    templateId :: string
    title :: string
    reason :: string
  @desc
    This method will take an id of a template, add attributes to the template
      and then insert it into the questionnaire collection
  @return
    newQuestionnaire :: object - questionnaire that was just created from the template
      shaped like { questionnaire, title, reason, dnpId, schema_version, _id, savedDate }
  */
  async createQuestionnaireFromTemplate(templateId, title, reason) {
    const emptyTemplate = await this.templateService.getTemplate(templateId);
    if (!emptyTemplate) {
      return null;
    }

    if (emptyTemplate._id) {
      delete emptyTemplate._id;
    }

    emptyTemplate.dnpId = uuidv4();
    emptyTemplate.title = title;
    emptyTemplate.reason = reason;
    emptyTemplate.schema_version = 0;
    emptyTemplate.savedDate = new Date();

    const questionnaireInserted =
      await this.questionnaireService.addQuestionnaire(emptyTemplate);

    // we want both a mongo id and a dnp id
    emptyTemplate._id = questionnaireInserted.insertedId;

    return emptyTemplate;
  }

  /*
  @params
    questionnaireObject :: object
  @desc
    This method will take a questionnaire, bump 
  @return
    newQuestionnaire :: object - questionnaire that was just created from the template
      shaped like { questionnaire, title, reason, dnpId, _id }
  */
  async saveQuestionnaire(questionnaireObject) {
    // here we will check and see if there is a label
    // and if there is, it needs to be in the proper state
    // this will be done soon enough

    if (questionnaireObject._id) {
      delete questionnaireObject._id;
    }

    questionnaireObject.schema_version += 1;

    // saving the date of the time we added this version
    questionnaireObject.savedDate = new Date();

    const questionnaireResult =
      await this.questionnaireService.addQuestionnaire(questionnaireObject);

    // copy our new mongo id to our object to send back to frontend
    questionnaireObject._id = questionnaireResult.insertedId;

    return questionnaireObject;
  }

  async getNewestQuestionnaire(questionnaireDnpId) {
    return await this.questionnaireService.getNewestQuestionnaire(
      questionnaireDnpId
    );
  }
}

exports.QuestionnaireController = QuestionnaireController;
