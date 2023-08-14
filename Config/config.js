const mongoose = require("mongoose");


const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`MongoDB Connected`)
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1)
  }
};


module.exports = connectDb
