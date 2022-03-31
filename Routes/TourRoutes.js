import Express from "express";
import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} from "./../Controllers/TourController.js";
const TourRouter = Express.Router();

TourRouter.param("id", checkID);

TourRouter.route("/").get(getAllTours).post(checkBody, createTour);
TourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

export default TourRouter;
