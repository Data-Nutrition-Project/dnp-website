const { v4: uuidv4 } = require('uuid');

class QuestionnaireController {
  constructor(questionnaireService, templateService) {
    this.questionnaireService = questionnaireService
    this.templateService = templateService
  }

  // start a new questionnaire from the given templateId
  async getQuestionnaireFromTemplate(templateId) {
    const emptyTemplate = await this.templateService.getTemplate(templateId)
    if ( !emptyTemplate )  {
      return null
    }

    emptyTemplate.dnpId = uuidv4()
    delete emptyTemplate._id

    const questionnaireInserted = await this.questionnaireService.addQuestionnaire(emptyTemplate)

    // we want both a mongo id and a dnp id
    emptyTemplate._id = questionnaireInserted.insertedId


    return emptyTemplate
  }

  // save a questionnaire as a user fills out new questions
  async saveQuestionnaire(questionnaireObject) {
    if ( questionnaireObject._id ) {
      delete questionnaireObject._id
    }

    if ( questionnaireObject.schema_version ) {
      questionnaireObject.schema_version += 1
    } else {
      questionnaireObject.schema_version = 2
    }

    const questionnaireResult = await this.questionnaireService.addQuestionnaire(questionnaireObject)
    return questionnaireResult
  }
}

exports.QuestionnaireController = QuestionnaireController
