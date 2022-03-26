import Express from "express";

const App = Express();

App.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the server", app: "Natours" });
});

const PORT = 3000;
App.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
