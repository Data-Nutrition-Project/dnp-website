// template service class
// these will wrap our database calls,
// nice clean way to abstract away our db details
class TemplateService {
  constructor(templatesCollection) {
    this.templatesCollection = templatesCollection
    this.requiredAttributes = [
      'status',
      'questions',
      'version',
    ]
  }

  // simply inserts
  addTemplate(templateObject) {
    return this.templatesCollection.insertOne(templateObject)
  }

  // simply fetches
  getTemplate(templateId) {
    return this.templatesCollection.findOne({_id: templateId})
  }

  // we want to make sure we have the right attributes
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
