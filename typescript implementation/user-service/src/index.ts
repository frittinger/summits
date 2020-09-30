const express = require('express');
const bodyParser = require('body-parser');
import { generateRoute } from './api/generateRoutes';
import {routes} from './api/routes'

const app = express();
app.use(bodyParser.json());

routes.forEach((route)=>{ generateRoute(app,route)});


app.listen(30000, () => {
    console.log("Server startet");
})
