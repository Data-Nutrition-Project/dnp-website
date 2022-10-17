const { ENUM } = require("../utils/enum.js");

class LabelController {
  constructor(labelService, questionnaireService, emailService) {
    this.labelService = labelService;
    this.questionnaireService = questionnaireService;
    this.emailService = emailService;
    this.lockedStates = [
      ENUM.LABEL_STATUS.APPROVED,
      ENUM.LABEL_STATUS.IN_REVIEW,
    ];
  }

  async submitLabel(questionnaireObject) {
    const clonedQuestionnaire = JSON.parse(JSON.stringify(questionnaireObject));

    // this needs to be a valid id
    const questionnaire =
      await this.questionnaireService.getNewestQuestionnaire(
        clonedQuestionnaire.dnpId
      );
    if (!questionnaire) {
      return null;
    }

    // cant submit if you arent supposed to
    const pastLabel = await this.labelService.getNewestLabel(
      clonedQuestionnaire.dnpId
    );
    if (pastLabel && this.lockedStates.includes(pastLabel.status)) {
      return null;
    }

    // update our questionnaire to have label fields
    clonedQuestionnaire.status = ENUM.LABEL_STATUS.IN_REVIEW;
    clonedQuestionnaire.schema_version = pastLabel
      ? pastLabel.schema_version
      : 0;
    const savedLabel = await this.saveLabel(clonedQuestionnaire);

    // notify our associates
    await this.emailService.sendEmailToDnpCrew(clonedQuestionnaire.dnpId);

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

    label.status = ENUM.LABEL_STATUS.APPROVED;
    label.version = 1;

    const savedLabel = await this.saveLabel(label);

    await this.emailService.sendApprovedEmailToLabelAuthor(label);

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

    label.status = ENUM.LABEL_STATUS.CHANGES_REQUESTED;
    const savedLabel = await this.saveLabel(label);

    await this.emailService.sendChangesEmailToLabelAuthor(label);

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

    clonedLabel.schema_version += 1;

    // saving the date of the time we added this version
    clonedLabel.savedDate = new Date();

    const labelResult = await this.labelService.addLabel(clonedLabel);

    // copy our new mongo id to our object to send back to frontend
    clonedLabel._id = labelResult.insertedId;

    return clonedLabel;
  }
}

exports.LabelController = LabelController;
