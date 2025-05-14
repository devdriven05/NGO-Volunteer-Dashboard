import mongoose from "mongoose";

export const connection = () => {
  // Add these required options for MongoDB connection
  const options = {
    dbName: "MERN_AUTHENTICATION",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  mongoose.connect(process.env.MONGO_URI, options)
    .then(() => {
      console.log("Connected to database successfully");

      // Verify session collection after connection
      const sessionStore = mongoose.connection.db.collection("sessions");
      sessionStore.createIndex({ expires: 1 }, { expireAfterSeconds: 0 })
        .then(() => console.log("Session TTL index created"))
        .catch(err => console.error("Session index error:", err));
    })
    .catch((err) => {
      console.error("Database connection error:", err);
      process.exit(1);
    });

  // Handle connection events
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected! Attempting reconnect...");
    setTimeout(() => connection(), 5000); // Reconnect after 5 seconds
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
};