import Express from "express";
import fs from "fs";
// prettier-ignore
const tours = JSON.parse( fs.readFileSync("./dev-data/data/tours-simple.json"));
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid URL",
    });
  }
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: "sucess",
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
  // console.log(req.body);
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(
    "./dev-datadata/tours-simple.json",
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const updateTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid URL",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour>",
    },
  });
};
const deleteTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid URL",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};
const TourRouter = Express.Router();

TourRouter.route("/").get(getAllTours).post(createTour);
TourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

export default TourRouter;