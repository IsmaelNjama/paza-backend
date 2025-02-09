const { MongoClient, ServerApiVersion } = require("mongodb");

//Initialize connection variables
let client;
let db;

async function run() {
  try {
    // Get the MongoDB URI from environment variable
    const secretString = process.env.MONGODB_URI;

    // Debug logging (without exposing sensitive data)
    console.log("MongoDB connection attempt starting...");
    console.log("URI exists:", !!secretString);

    // Parse the URI if it's in JSON format
    let uri;
    try {
      const parsed = JSON.parse(secretString);
      uri = parsed.MONGODB_URI;
    } catch (e) {
      // If parsing fails, use the string directly
      uri = secretString;
    }

    // Validate URI
    if (!uri) {
      throw new Error("MongoDB URI is undefined or empty");
    }

    if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
      throw new Error("Invalid MongoDB URI format");
    }

    // Create MongoClient
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      // Options for better reliability
      connectTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 50,
      retryWrites: true,
    });

    // Connect to MongoDB
    await client.connect();

    // Initialize database
    db = client.db("PazaSocialWebDB");

    // Verify connection with a ping
    await db.command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");

    // Set up connection error handler
    client.on("error", (error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    });

    // Handle application shutdown gracefully
    process.on("SIGINT", async () => {
      await closeConnection();
      process.exit(0);
    });
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    throw error;
  }
}

async function closeConnection() {
  if (client) {
    try {
      await client.close();
      console.log("MongoDB connection closed. ");
    } catch (error) {
      console.error("Error closing MongoDB connection", error);
    }
  }
}

// Ensure collections exist before returning them
const getCollection = (collectionName) => {
  if (!db) {
    throw new Error("Database connection not established. Call run() first. ");
  }

  return db.collection(collectionName);
};

module.exports = {
  run,
  users: () => getCollection("users"),
  tasks: () => getCollection("tasks"),
  campaigns: () => getCollection("campaigns"),
  jobs: () => getCollection("jobs"),
  messages: () => getCollection(" messages"),
  conversations: () => getCollection("conversations"),
};
