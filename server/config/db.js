const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  
  /* useNewUrlParser: This property specifies that Mongoose should use the new URL parser to parse MongoDB connection strings. This is set to true by default. useUnifiedTopology: This property specifies that Mongoose should use the new Server Discovery and Monitoring engine. This is set to false by default.*/
  
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = {connectDB};
