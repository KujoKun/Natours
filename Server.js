import App from "./App.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
// console.log(process.env.PORT);

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
const PORT = process.env.PORT || 3000;
App.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
