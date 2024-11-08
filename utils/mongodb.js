const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
async function run() {
  try {
    await client.connect();
    db = client.db("PazaSocialWebDB", { ping: 1 });

    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error", error);
  }
}
module.exports = {
  run,
  users: () => {
    return db.collection("users");
  },
  tasks: () => {
    return db.collection("tasks");
  },
  campaigns: () => {
    return db.collection("campaigns");
  },
  jobs: () => {
    return db.collection("jobs");
  },
  messages: () => {
    return db.collection("messages");
  },
  conversations: () => {
    return db.collection("conversations");
  },
};
