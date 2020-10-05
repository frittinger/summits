import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
console.log(__dirname);
const express = require("express");
const bodyParser = require("body-parser");
import { generateRoute } from "./api/generateRoutes";
import { routes } from "./api/routes";

const app = express();
app.use(bodyParser.json());

routes.forEach((route) => {
  generateRoute(app, route);
});
console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log("Server startet");
});
