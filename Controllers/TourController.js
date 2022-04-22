/* eslint-disable prettier/prettier */
import Tour from "./../Models/tourModel.js";
import _ from "lodash";
// const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));

const getAllTours = async (req, res) => {
  try {
    //Building the query
    const qObj = { ...req.query };
    const excludedField = ["page", "sort", "limit", "field"];
    excludedField.forEach((el) => delete qObj[el]);
    // const qObj = _.omit({ ...req.query }, ["page", "sort", "limit", "field"]);
    //Advanced filtering
    let qStr = JSON.stringify(qObj);
    qStr = qStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Tour.find(JSON.parse(qStr));
    console.log(qStr);
    //{diffculty: easy, duration: {$gte: 5}}
    console.log(req.query);
    console.log(req.body);
    //Execute the query

    //Sorting
    if (req.query.sort) {
      console.log("wow");
      query = query.sort(req.query.sort);
    }
    const tours = await query;

    //Send resposne
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "sucess",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
};
const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export { getAllTours, getTour, createTour, updateTour, deleteTour };
