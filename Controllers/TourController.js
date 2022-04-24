/* eslint-disable prettier/prettier */
import Tour from "./../Models/tourModel.js";
import _ from "lodash";
// const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));
const aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingAverage,price";
  req.query.fields = "name,price,ratingAverage,summary,difficulty";
  next();
};
const getAllTours = async (req, res) => {
  try {
    //Building the query
    const qObj = _.omit({ ...req.query }, ["page", "sort", "limit", "fields"]);

    //Advanced filtering
    let qStr = JSON.stringify(qObj);
    qStr = qStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Tour.find(JSON.parse(qStr));
    //Execute the query

    //Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query.sort("-createdAt");
    }
    //Field limiting:

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //pagination

    const page = req.query.page * 1 || 1;
    const limitVal = req.query.limit * 1 || 100;

    const skipVal = (page - 1) * limitVal;
    query = query.skip(skipVal).limit(limitVal);
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skipVal >= numTours) {
        throw new Error("This page does not exist");
      }
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
    res.status(404).json({
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

export {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
};
