import fs, { readdirSync } from "fs";
// prettier-ignore
const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));

export const checkID = (req, res, next, value) => {
  console.log("Middleware checkID");
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid URL",
    });
  }
  next();
};
export const checkBody = (req, res, next) => {
  console.log(`Checking body test`);
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ status: "fail", message: "Missing name or price" });
  }
  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: "sucess",
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
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
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour>",
    },
  });
};
const deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};

export { getAllTours, getTour, createTour, updateTour, deleteTour };
