const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const stateModel = require("../schema/states");

const connectToMongo = async () => {
  await dbConnection(process.env.MONGO_URI);
};
connectToMongo();

const districtModel = require("../schema/districts");

const seedData = async () => {
  const state = await stateModel.findOne({ name: "Maharashtra" });

  const seedDistrict = [
    {
      name: "Thane",
      state: state._id,
    },
    {
      name: "Akola",
      state: state._id,
    },
    {
      name: "Nanded",
      state: state._id,
    },
    {
      name: "Sindhudurg",
      state: state._id,
    },
  ];

  const importData = async () => {
    try {
      await districtModel.deleteMany({});
      await districtModel.insertMany(seedDistrict);
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
