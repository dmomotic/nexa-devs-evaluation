const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Data base ready");
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't connect with mongo");
  }
};

module.exports = {
  dbConnection,
};