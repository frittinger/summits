import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
const express = require("express");
const bodyParser = require("body-parser");
import { generateRoute } from "./api/generateRoutes";
import { routes } from "./api/routes";

const app = express();
app.use(bodyParser.json());

routes.forEach((route) => {
  generateRoute(app, route);
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
