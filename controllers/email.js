const sgMail = require("@sendgrid/mail");

class EmailController {
  constructor(key) {
    this.emailClient = sgMail;
    this.emailClient.setApiKey(key);

    this.fromEmail = "info@datanutrition.org";
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
    return this.sendEmail(
      "hgmaxwellking@gmail.com",
      "New Label Submition",
      `Check out this new label! <a href='https://labelmaker.datanutrition.org/questionnaire/${id}'>Review Label</a>`
    );
  }

  sendEmailToLabelAuthor(questionnaire) {
    const email = this.getEmailFromQuestionnaire(questionnaire);
    const id = questionnaire.dnpId;

    return this.sendEmail(
      email,
      "Updates To Your Label Status",
      `Check out your label! <a href='https://labelmaker.datanutrition.org/questionnaire/${id}'>View Label</a>`
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
      !questionnaire.questionnaire[0].questions[9]
      || !questionnaire.questionnaire[0].questions[9].answer
    ) {
      return null;
    }

    return questionnaire.questionnaire[0].questions[9].answer;
  }
}

exports.EmailController = EmailController;
