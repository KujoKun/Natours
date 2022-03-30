import Express from "express";
import morgan from "morgan";
import TourRouter from "./routes/TourRoutes.js";
import UserRouter from "./routes/UserRoutes.js";

const App = Express();

//Middleware
App.use(morgan("dev"));
App.use(Express.json());
App.use((req, res, next) => {
  console.log("Hello from middleware");
  next();
});
App.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//Route handlers

// App.get("/api/v1/tours", getAllTours);
// App.post("/api/v1/tours", createTour);
// App.get("/api/v1/tours/:id", getTour);
// App.patch("/api/v1/tours/:id", updateTour);
// App.delete("/api/v1/tours/:id", deleteTour);
//Routes

App.use("/api/v1/tours", TourRouter);
App.use("/api/v1/users", UserRouter);
//Start server
const PORT = 3000;
App.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
