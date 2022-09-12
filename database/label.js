const { ENUM } = require("../utils/ENUM.js");

// label service class
// these will wrap our database calls,
// nice clean way to abstract away our db details
class LabelService {
  constructor(labelsCollection) {
    this.labelsCollection = labelsCollection;
  }

  /*
  @params
    labelObject :: object - label to be inserted
  @desc
    This method will insert a given label object into the database
        under the label collection
  @return
    Mongo Insert object - contains vital information like what id the object
        was inserted under
  */
  addLabel(labelObject) {
    return this.labelsCollection.insertOne(labelObject);
  }

  /*
  @params
    labelId :: MongoId - id of the label to be found in database
  @desc
    This method will find a label that has the given _id in the
        labels collection
  @return
    label object - singular label that has the given _id
  */
  getLabel(labelId) {
    return this.labelsCollection.findOne({ _id: labelId });
  }

  /*
  @params
    labelId :: dnpId - dnp id of the label to be found in database
  @desc
    This method will find a label that has the given dnp id in the
        labels collection,
  @return
    label object - singular label that has the given dnp id
  */
  getNewestLabel(labelDnpId) {
    return this.labelsCollection.findOne(
      { dnpId: labelDnpId },
      { sort: { schema_version: -1 } }
    );
  }

  /*
  @desc
    This will return all labels marked as approved from the db
  @return
    List of label objects of all approved labels sorted by date
   */
  getApprovedLabels() {
    return this.labelsCollection.find({ status: ENUM.LABEL_STATUS.APPROVED }).toArray();
  }
}

exports.LabelService = LabelService;
