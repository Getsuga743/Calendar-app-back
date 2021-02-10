const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_DB || process.env.DB_CNN;

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
