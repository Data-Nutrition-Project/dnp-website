const { v4: uuidv4 } = require('uuid');

class QuestionnaireController {
  constructor(questionnaireService, templateService) {
    this.questionnaireService = questionnaireService
    this.templateService = templateService
  }

  // start a new questionnaire from the given templateId
  async getQuestionnaireFromTemplate(templateId, name) {
    const emptyTemplate = await this.templateService.getTemplate(templateId)
    if ( !emptyTemplate )  {
      return null
    }

    emptyTemplate.dnpId = uuidv4()
    delete emptyTemplate._id

    emptyTemplate.name = name

    const questionnaireInserted = await this.questionnaireService.addQuestionnaire(emptyTemplate)

    // we want both a mongo id and a dnp id
    emptyTemplate._id = questionnaireInserted.insertedId


    return emptyTemplate
  }

  // save a questionnaire as a user fills out new questions
  // bumps the version, marks the time it happens
  // returns the whole object
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
    // copy our new mongo id to our object to send back to frontend
    questionnaireObject._id = questionnaireResult.insertedId
    questionnaireObject.savedDate = new Date()
    return questionnaireObject
  }
}

exports.QuestionnaireController = QuestionnaireController
