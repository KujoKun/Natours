import App from "./App.js";

// console.log(process.env.PORT);
const PORT = process.env.PORT || 3000;
App.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
