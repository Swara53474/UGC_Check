const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const userModel = require("../schema/users");

const connectToMongo = async () => {
  await dbConnection(process.env.MONGO_URI);
};
connectToMongo();

const universityModel = require("../schema/universities");
const seedUniversities = [];
let i = 1;
const seedData = async () => {
  const users = await userModel.find();
  for (let user of users) {
    seedUniversities.push({
      name: `University ${i}`,
      admin: user._id,
    });
    i++;
  }

  const importData = async () => {
    try {
      await universityModel.deleteMany({});
      await universityModel.insertMany(seedUniversities);
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
