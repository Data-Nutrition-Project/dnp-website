const sgMail = require("@sendgrid/mail");

class EmailController {
  constructor(key, dnpEmails, fromEmail, frontendUrl) {
    this.emailClient = sgMail;
    this.emailClient.setApiKey(key);

    this.dnpEmails = dnpEmails;
    this.frontendUrl = frontendUrl;
    this.fromEmail = fromEmail;
  }

  sendEmail(to, subject, body) {
    const msg = {
      to: to,
      from: this.fromEmail,
      subject: subject,
      html: body,
    };

    this.emailClient.send(msg);
  }

  sendEmailToDnpCrew(id) {
    const sendEmailMapper = (email) =>
      this.sendEmail(
        email,
        "New Label Submition",
        `A new label has been submitted for review! <a href='${this.frontendUrl}/questionnaire/${id}'>Review Label</a>`
      );

    return Promise.all(this.dnpEmails.map(sendEmailMapper));
  }

  sendApprovedEmailToLabelAuthor(questionnaire) {
    const email = this.getEmailFromQuestionnaire(questionnaire);
    const id = questionnaire.dnpId;

    return this.sendEmail(
      email,
      `Your Label ${questionnaire.title} has been approved`,
      `Check out your label! <a href='${this.frontendUrl}/questionnaire/${id}'>View Label</a>`
    );
  }

  sendChangesEmailToLabelAuthor(questionnaire) {
    const email = this.getEmailFromQuestionnaire(questionnaire);
    const id = questionnaire.dnpId;

    return this.sendEmail(
      email,
      `There is a request for changes to some of your ${questionnaire.title} questionnaire responses`,
      `Check out your label! <a href='${this.frontendUrl}/questionnaire/${id}'>View Label</a>`
    );
  }

  sendSavedPlaceEmailToLabelAuthor(questionnaire) {
    const email = this.getEmailFromQuestionnaire(questionnaire);
    const id = questionnaire.dnpId;

    return this.sendEmail(
      email,
      `Your Label ${questionnaire.title} has been saved`,
      `Check out your label! <a href='${this.frontendUrl}/questionnaire/${id}'>View Label</a>`
    );
  }

  // this is a temporary fix :)
  // we wold like to do something like
  // questionnaire.email in the future
  getEmailFromQuestionnaire(questionnaire) {
    if (
      !questionnaire ||
      !questionnaire.questionnaire ||
      !questionnaire.questionnaire[0] ||
      !questionnaire.questionnaire[0].questions[9] ||
      !questionnaire.questionnaire[0].questions[9].answer
    ) {
      return null;
    }

    return questionnaire.questionnaire[0].questions[9].answer;
  }
}

exports.EmailController = EmailController;
