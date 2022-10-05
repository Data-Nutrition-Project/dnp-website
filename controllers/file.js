const { S3 } = require('aws-sdk')

class FileController {
    constructor(labelUploadBucketName) {
        this.s3 = new S3();
        this.labelUploadBucketName = labelUploadBucketName
    }

    uploadFile(bucket, key, file) {
        const uploadParams = {
            Bucket: bucket,
            Key: key,
            Body: file,
        }

        this.s3.putObject(uploadParams, function(err, data) {
            if (err) throw new Error(err);
            else     console.log(data);
        });
    }

    uploadLabelUploadFile(key, file) {
        return this.uploadFile(this.labelUploadBucketName, key, file)
    }
}

exports.FileController = FileController;