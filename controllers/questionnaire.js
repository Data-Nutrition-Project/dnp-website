const { v4: uuidv4 } = require("uuid");
const { ENUM } = require("../utils/ENUM.js");

class QuestionnaireController {
  constructor(questionnaireService, templateService, labelService, emailController) {
    if (!questionnaireService || !templateService || !labelService) {
      throw new Error("QuestionnaireController Dependency Error");
    }

    this.questionnaireService = questionnaireService;
    this.templateService = templateService;
    this.labelService = labelService;
    this.emailController = emailController;
    this.lockedStates = [
      ENUM.LABEL_STATUS.APPROVED,
      ENUM.LABEL_STATUS.IN_REVIEW,
    ];
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
  async saveQuestionnaire(dnpId, questionnaireObject) {
    const label = await this.labelService.getNewestLabel(dnpId);
    if (label && this.lockedStates.includes(label.status)) {
      return null;
    }

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

  async saveQuestionnairePlace(questionnaireObject) {
    return this.emailController.sendSavedPlaceEmailToLabelAuthor(questionnaireObject)
  }
}

exports.QuestionnaireController = QuestionnaireController;
