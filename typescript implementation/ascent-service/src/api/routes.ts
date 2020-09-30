import { E_METHOD } from './generateRoutes';
const properties = require('../../package.json');
import { Request, Response } from "express";
import {sendPostRequest,sendGetRequest} from '../requestHelper';
import {responseFromDatabase} from '../requestHelper';

const ascentSki = {
    id: 1,
    summitId: 2,
    userId: 2,
    ascentDate: "2019-04-01",
    status: "success",
    tourType: "ski"
}
const ascentHike = {
    id: 1,
    summitId: 1,
    userId: 2,
    ascentDate: "2019-08-01",
    status: "success",
    tourType: "hike"
}

export interface Route{
    callback: Function;
    method: E_METHOD;
    endPoint: string;
}

function checkJson(jsonObject: any){

    return jsonObject.summitId && jsonObject.userId && jsonObject.ascentDate && jsonObject.status && jsonObject.tourType;

}

export let routes: Route[] = [];

let routeAbout: Route = {

    callback: (req: Request, res: Response) => {
        const aboutInfo = {
            name: properties.name,
            version: properties.version
        }
        res.status(200).json(aboutInfo);
    },
    method: E_METHOD.GET,
    endPoint: "/about"
}
let createAscent: Route = {

    callback: (req: Request, res: Response) => {
        if(checkJson(req.body))
        {
            sendPostRequest("createAscent", req.body, (responseObject:responseFromDatabase) => {

                res.status(responseObject.code).send(responseObject.message);
            });
        }
        else{

            res.status(400).send("Das Json Object hatte nicht die richtigen Felder");
        }
    },
    method: E_METHOD.POST,
    endPoint: "/createAscent"
}
let getAscentById: Route = {

    callback: (req: Request, res: Response) => {
        if (req.params.ascentId)
        {
            sendGetRequest(`getAscent?search=Id&value=${req.params.ascentId}`, "GET", (responseObject: responseFromDatabase) => {
                res.status(responseObject.code).send(responseObject.message);
            });  
        }
        else{

            res.status(400).send("Das Json Object hatte nicht die richtigen Felder");
        } 
    },
    method: E_METHOD.GET,
    endPoint: "/getAscent/:ascentId"
}
let deleteAscentById: Route = {

    callback: (req: Request, res: Response) => {
        if (req.params.ascentId) {
            sendGetRequest(`deleteAscent?search=Id&value=${req.params.ascentId}`, "DELETE", (responseObject: responseFromDatabase) => {
                res.status(responseObject.code).send(responseObject.message);
            });
        }
        else {
            res.status(400).send("Das Json Object hatte nicht die richtigen Felder");
        } 
    },
    method: E_METHOD.DELETE,
    endPoint: "/deleteAscent/:ascentId"
}
let getAscentsBySummitId: Route = {

    callback: async (req: Request, res: Response) => {

        if (req.params.summitId) {
            
            sendGetRequest(`getAscent?search=summitId&value=${req.params.summitId}`, "GET", (responseObject: responseFromDatabase) => {
                res.status(responseObject.code).send(responseObject.message);
            });  
        }
        else {

            res.status(400).send("Das Json Object hatte nicht die richtigen Felder");
        }  
    },
    method: E_METHOD.GET,
    endPoint: "/getAscentsBySummit/:summitId"
}
let getAscentsByUserId: Route = {

    callback: async (req: Request, res: Response) => {
        
        if (req.params.userId) {
            sendGetRequest(`getAscent?search=userId&value=${req.params.userId}`,"GET", (responseObject: responseFromDatabase) => {
                res.status(responseObject.code).send(responseObject.message);
            });
        }
        else {

            res.status(400).send("Das Json Object hatte nicht die richtigen Felder");
        } 
    },
    method: E_METHOD.GET,
    endPoint: "/getAscentsByUser/:userId"
}
routes.push(getAscentsByUserId);
routes.push(getAscentsBySummitId);
routes.push(getAscentById);
routes.push(deleteAscentById);
routes.push(createAscent);
routes.push(routeAbout);