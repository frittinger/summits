const express = require('express');
const bodyParser = require('body-parser');
import {Mongodb} from './database/mongodb'
import { generateRoute } from './api/generateRoutes';
import { routes } from './api/routes'


const app = express();
app.use(bodyParser.json());

routes.forEach((route) => { generateRoute(app, route) });


app.listen(29000, async () => {
    try {
        await Mongodb.connect();
        console.log("Datenbank gestartet");
    }
    catch (err) {
        console.log(err);
    }
    console.log("Server startet");
});