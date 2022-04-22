import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import Tour from "../../Models/tourModel.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// console.log(process.env.PORT);
// import path from "node:path";
// const __dirname = path.dirname(__filename);

const DB =
  "mongodb+srv://kujo:00U3Kcj97Cx0PWLz@cluster0.lornb.mongodb.net/Natours?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log("DB connection success");
  });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
//Delete all data
const delData = async () => {
  console.log("ran function");
  try {
    await Tour.deleteMany();
    console.log("Data deleted");
  } catch (err) {
    console.log(err, "ERROR");
  }
  process.exit();
};
console.log(process.argv);
console.log(Tour);
if (process.argv[2] === "--import") {
  importData();
}
//prettier-ignore
if (process.argv[2] === '--delete') {
  delData();
}
