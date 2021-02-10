const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const mongoUrl = process.env.DB_CNN || process.env.MONGO_DB;
const dbConnection = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('DB online');
  } catch (error) {
    console.log(error);
    throw new Error('Error in db');
  }
};
module.exports = { dbConnection };
