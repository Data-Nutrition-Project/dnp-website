// questionnaire service class
// these will wrap our database calls,
// nice clean way to abstract away our db details
class QuestionnaireService {
  constructor(questionnairesCollection) {
    this.questionnairesCollection = questionnairesCollection
  }

  // simply inserts
  addQuestionnaire(questionnaireObject) {
    return this.questionnairesCollection.insertOne(questionnaireObject)
  }

  // simply fetches
  getQuestionnaire(questionnaireId) {
    return this.questionnairesCollection.findOne({_id: questionnaireId})
  }

  getQuestionnaireByDnpId(questionnaireDnpId) {
    return this.questionnairesCollection.findOne({dnpId: questionnaireDnpId})
  }
}

exports.QuestionnaireService = QuestionnaireService
