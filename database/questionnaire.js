// questionnaire service class
// these will wrap our database calls,
// nice clean way to abstract away our db details
class QuestionnaireService {
  constructor(questionnairesCollection) {
    this.questionnairesCollection = questionnairesCollection
  }

  /*
  @params
    questionnaireObject :: object - questionnaire to be inserted
  @desc
    This method will insert a given questionnaire object into the database
      under the questionnaire collection
  @return
    Mongo Insert object - contains vital information like what id the object
      was inserted under
  */
  addQuestionnaire(questionnaireObject) {
    return this.questionnairesCollection.insertOne(questionnaireObject)
  }

  /*
  @params
    templateId :: MongoId - id of the questionnaire to be found in database
  @desc
    This method will find a questionnaire that has the given _id in the
      questionnaires collection
  @return
    questionnaire object - singular questionnaire that has the given _id
  */
  getQuestionnaire(questionnaireId) {
    return this.questionnairesCollection.findOne({_id: questionnaireId})
  }

  /*
  @params
    questionnaireId :: dnpId - dnp id of the questionnaire to be found in database
  @desc
    This method will find a questionnaire that has the given dnp id in the
      questionnaires collection with the highest schema version
  @return
    questionnaire object - singular questionnaire that has the given dnp id
      with the highest schema version
  */
  getQuestionnaireByDnpId(questionnaireDnpId) {
    return this.questionnairesCollection.findOne({dnpId: questionnaireDnpId})
  }

  /*
  @params
    questionnaireId :: dnpId - dnp id of the questionnaire to be found in database
  @desc
    This method will find a questionnaire that has the given dnp id in the
      questionnaires collection,
  @return
    questionnaire object - singular questionnaire that has the given dnp id
  */
  getNewestQuestionnaire(questionnaireDnpId) {
    return this.questionnairesCollection
      .findOne({dnpId: questionnaireDnpId}, {sort: { schema_version: -1 }})
  }
}

exports.QuestionnaireService = QuestionnaireService
