const express = require('express');
const bodyParser = require('body-parser');
import { Request, Response } from "express";
import { generateRoute } from './api/generateRoutes';
import { E_METHOD } from './api/generateRoutes';
import {routes} from './api/routes'
import { Route } from './api/routes'

const app = express();
app.use(bodyParser.json());

routes.forEach((route)=>{ generateRoute(app,route)});

app.listen(28000, () => {
    console.log("Server startet");
})
