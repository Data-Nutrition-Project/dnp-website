const { MongoClient } = require("mongodb");

exports.connect = async (uri) => {
  const client = new MongoClient(uri);
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return client;
};
