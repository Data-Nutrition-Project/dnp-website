// template service class
// these will wrap our database calls,
// nice clean way to abstract away our db details
class TemplateService {
  constructor(templatesCollection) {
    this.templatesCollection = templatesCollection
  }

  // simply inserts
  async addTemplate(templateObject) {
    return this.templatesCollection.insertOne(templateObject)
  }

  // simply fetches
  async getTemplate(templateId) {
    return this.templatesCollection.findOne({_id: templateId})
  }
}

exports.TemplateService = TemplateService
