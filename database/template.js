// template service class
// these will wrap our database calls,
// nice clean way to abstract away our db details
class TemplateService {
  constructor(templatesCollection) {
    this.templatesCollection = templatesCollection
    this.requiredAttributes = [
      'status',
      'questionnaire',
      'version'
    ]
  }

  /*
  @params
    templateObject :: object - template to be inserted, see required attributes
  @desc
    This method will insert a given template object into the database
      under the template collection
  @return
    Mongo Insert object - contains vital information like what id the object
      was inserted under
  */
  addTemplate(templateObject) {
    return this.templatesCollection.insertOne(templateObject)
  }

  /*
  @params
    templateId :: MongoId - id of the template to be found in database
  @desc
    This method will find a template that has the given _id in the
      templates collection
  @return
    template object - singular template that has the given _id
  */
  getTemplate(templateId) {
    return this.templatesCollection.findOne({_id: templateId})
  }

  /*
  @params
    templateObject :: object - template to be verified
  @desc
    This method will validate whether the proper attributes are in place
  @return
    null if invalid, templateObject param if valid
  */
  validateTemplate(templateObject) {
    const matches = this.requiredAttributes
      .filter(d => !(d in templateObject))

    if ( matches.length ) {
      return null
    } else {
      return templateObject
    }
  }
}

exports.TemplateService = TemplateService
