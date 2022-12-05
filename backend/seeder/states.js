const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const countryModel = require("../schema/countries");

const connectToMongo = async () => {
  await dbConnection(process.env.MONGO_URI);
};
connectToMongo();

const stateModel = require("../schema/states");

const seedData = async () => {
  const india = await countryModel.findOne({ name: "India" });

  const seedState = [
    {
      name: "Maharashtra",
      country: india._id,
    },
    {
      name: "Odisha",
      country: india._id,
    },
    {
      name: "Tamil Nadu",
      country: india._id,
    },
    {
      name: "Assam",
      country: india._id,
    },
  ];

  const importData = async () => {
    try {
      await stateModel.deleteMany({});
      await stateModel.insertMany(seedState);
      console.log("Data imported successfully");
      process.exit();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };

  importData().then(() => {
    mongoose.connection.close();
  });
};
seedData();
