import Express from "express";
import morgan from "morgan";
import TourRouter from "./routes/TourRoutes.js";
import UserRouter from "./routes/UserRoutes.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const App = Express();

//Middleware
if (process.env.NODE_ENV === "development") {
  App.use(morgan("dev"));
}
App.use(Express.json());
App.use(Express.static("./public"));

App.use((req, res, next) => {
  // console.log("Hello from middleware");
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

export default App;
