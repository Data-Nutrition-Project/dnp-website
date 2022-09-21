const AWS = require("aws-sdk");

class S3Controller {
  constructor() {
    this.s3Client = new AWS.S3({ apiVersion: "2006-03-01" });
  }

  uploadFile(fileName, body) {
    // Create params for putObject call
    const objectParams = { Bucket: bucketName, Key: fileName, Body: body };
    // Create object upload promise
    return this.s3Client.putObject(objectParams).promise();
  }

  getFile(fileName) {
    this.s3Client.getObject;
  }
}
