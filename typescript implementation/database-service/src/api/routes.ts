import { E_METHOD } from './generateRoutes';
import { Mongodb } from '../database/mongodb'
import { Request, Response } from "express";
import {getNextID} from "../logic/generateValues"
import { searchInSummit, deleteInSummit} from "../database/databaseOperation"
import {sendResponse} from "../logic/sendResponse";

export interface Route{
    callback: Function;
    method: E_METHOD;
    endPoint: string;
}

export let routes: Route[] = [];

let createAscent: Route = {

    callback: async (req: Request, res: Response) => {

        let result = await searchInSummit("userId", req.body.userId, "user", "summit" ,true);

        if(result.length != 0)
        {
            let ascents = await searchInSummit("", 0, "ascent", "summit", false);

            req.body["Id"] = getNextID(ascents,"Id");
            let insertCount = await (await Mongodb.client.db("summit").collection("ascent").insertOne(req.body)).insertedCount;
            
            sendResponse(res, insertCount == 1, `Ascent mit der ID ${req.body["Id"]} wurde Erfolgreich hinzugefügt`,
                "Es gab ein Fehler beim hinzufügen des Aufstiegs");         
        }
        else 
        {
            res.status(400).send("Es gibt kein User mit dieser ID");
        }
        
    },
    method: E_METHOD.POST,
    endPoint: "/createAscent"
}

let createUser: Route = {

    callback: async (req: Request, res: Response) => {

        let result = await searchInSummit("name", req.body.name, "user", "summit", true);

        if (result.length == 0) {

            let users = await searchInSummit("", 0, "user", "summit", false)

            req.body["userId"] = getNextID(users,"userId");

            let insertCount = await (await Mongodb.client.db("summit").collection("user").insertOne(req.body)).insertedCount;
            
            sendResponse(res, insertCount == 1, `User mit der ID ${req.body["userId"]} wurde Erfolgreich hinzugefügt`,
                "Es gab ein Fehler beim hinzufügen des Users");
        }
        else {
            res.status(400).send(`Es gibt den User ${req.body.name} schon `);
        }
    },
    method: E_METHOD.POST,
    endPoint: "/createUser"
}

let getAscent: Route = {

    callback: async (req: Request, res: Response) => {
        
        if (req.query.search && req.query.value)
        {
            let ascent = await searchInSummit(req.query.search.toString(), +req.query.value.toString(), "ascent", "summit", true);

            sendResponse(res, ascent.length >= 1, JSON.stringify(ascent), `Ascent mit der ${req.query.search} ${req.query.value} konnte nicht gefunden werden`);
        }  
        else
        {
            res.status(400).send("Die Anfrage hatte nicht die richtigen Queryparams");
        }
    },
    method: E_METHOD.GET,
    endPoint: "/getAscent"
}
let deleteAscent: Route = {

    callback: async (req: Request, res: Response) => {

        if (req.query.search && req.query.value) {

            let countDeletet = await deleteInSummit(req.query.search.toString(), +req.query.value.toString(), "ascent",false);

            sendResponse(res, countDeletet == 1, `Ascent mit der ID ${req.query.value} erfolgreich gelöscht`,
                `Ascent mit der ID ${ req.query.value } konnte nicht  gelöscht(gibt es dieses Ascent ?)`);
        }
        else {
            res.status(400).send("Die Anfrage hatte nicht die richtigen Queryparams");
        }
    },
    method: E_METHOD.DELETE,
    endPoint: "/deleteAscent"
}
let deleteUser: Route = {

    callback: async (req: Request, res: Response) => {

        if (req.query.search && req.query.value) {

            let countDeletet = await deleteInSummit(req.query.search.toString(), +req.query.value.toString(), "user",false);

            await deleteInSummit("userId", +req.query.value.toString(),"ascent",true);

            sendResponse(res, countDeletet == 1, `User mit der ID ${req.query.value} erfolgreich gelöscht`,
                `Ascent mit der ID ${req.query.value} konnte nicht  gelöscht (gibt es dieses User ?)`);
        }
        else {
            res.status(400).send("Die Anfrage hatte nicht die richtigen Queryparams");
        }
    },
    method: E_METHOD.DELETE,
    endPoint: "/deleteUser"
}
let getUser: Route = {

    callback: async (req: Request, res: Response) => {

        if (req.query.search && req.query.value) {

            let user = await searchInSummit(req.query.search.toString(), +req.query.value.toString(), "user", "summit", true);

            sendResponse(res, user.length >= 1, JSON.stringify(user), `User mit der ${req.query.search} ${req.query.value} konnte nicht gefunden werden`);
        }
    },
    method: E_METHOD.GET,
    endPoint: "/getUser"
}

routes.push(getAscent);
routes.push(deleteAscent);
routes.push(createAscent);
routes.push(createUser);
routes.push(deleteUser);
routes.push(getUser);