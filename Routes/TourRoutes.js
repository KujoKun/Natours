import Express from "express";
import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
} from "./../Controllers/TourController.js";
const TourRouter = Express.Router();

// TourRouter.param("id", checkID);
TourRouter.route("/top-5-cheap").get(aliasTopTours, getAllTours);
TourRouter.route("/").get(getAllTours).post(createTour);
TourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

export default TourRouter;
