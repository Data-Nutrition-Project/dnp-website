class LabelController {
  constructor(labelService, questionnaireService) {
    this.labelService = labelService;
    this.questionnaireService = questionnaireService;
  }

  async submitLabel(questionnaireObject) {
    const questionnaire =
      await this.questionnaireService.getNewestQuestionnaire(
        questionnaireObject.dnpId
      );
    if (!questionnaire) {
      return null;
    }

    questionnaireObject.status = "IN REVIEW";
    const savedLabel = await this.saveLabel(questionnaireObject);
    return savedLabel;
  }

  async approveLabel(dnpId) {
    const label = await this.labelService.getNewestLabel(dnpId);
    if (!label) {
      return null;
    }

    const questionnaire =
      await this.questionnaireService.getNewestQuestionnaire(dnpId);
    if (!questionnaire) {
      return null;
    }

    label.status = "APPROVED";
    label.version = 1;
    const savedLabel = await this.saveLabel(label);

    return savedLabel;
  }

  async requestChangesForLabel(dnpId) {
    const label = await this.labelService.getNewestLabel(dnpId);
    if (!label) {
      return null;
    }
    const questionnaire =
      await this.questionnaireService.getNewestQuestionnaire(dnpId);
    if (!questionnaire) {
      return null;
    }

    label.status = "CHANGES REQUESTED";
    const savedLabel = await this.saveLabel(label);

    return savedLabel;
  }

  // save a label as a user fills out new questions
  // bumps the version, marks the time it happens
  // returns the whole object
  async saveLabel(labelObject) {
    const clonedLabel = JSON.parse(JSON.stringify(labelObject));

    if (clonedLabel._id) {
      delete clonedLabel._id;
    }

    if (clonedLabel.schema_version) {
      clonedLabel.schema_version += 1;
    } else {
      clonedLabel.schema_version = 2;
    }

    // saving the date of the time we added this version
    clonedLabel.savedDate = new Date();

    const labelResult = await this.labelService.addLabel(clonedLabel);

    // copy our new mongo id to our object to send back to frontend
    clonedLabel._id = labelResult.insertedId;

    return clonedLabel;
  }
}

exports.LabelController = LabelController;
