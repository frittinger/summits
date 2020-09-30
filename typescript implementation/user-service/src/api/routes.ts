import { E_METHOD } from './generateRoutes';
const properties = require('../../package.json');
import { Request, Response } from "express";
import {sendPostRequest,sendGetRequest} from '../requestHelper';
import {responseFromDatabase} from '../requestHelper';

export interface Route{
    callback: Function;
    method: E_METHOD;
    endPoint: string;
}

function checkJson(jsonObject: any){

    return jsonObject.name;
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
let createUser: Route = {

    callback: (req: Request, res: Response) => {
        if(checkJson(req.body))
        {
            sendPostRequest("createUser", req.body, (responseObject:responseFromDatabase) => {

                res.status(responseObject.code).send(responseObject.message);
            });
        }
        else{

            res.status(400).send("Das Json Object hatte nicht die richtigen Felder");
        }
    },
    method: E_METHOD.POST,
    endPoint: "/createUser"
}
let getUserById: Route = {

    callback: (req: Request, res: Response) => {
        if (req.params.userId)
        {
            sendGetRequest(`getUser?search=userId&value=${req.params.userId}`, "GET", (responseObject: responseFromDatabase) => {
                res.status(responseObject.code).send(responseObject.message);
            });  
        }
        else{

            res.status(400).send("Das Json Object hatte nicht die richtigen Felder");
        } 
    },
    method: E_METHOD.GET,
    endPoint: "/getUser/:userId"
}
let deleteUserById: Route = {

    callback: (req: Request, res: Response) => {
        if (req.params.userId) {
            sendGetRequest(`deleteUser?search=userId&value=${req.params.userId}`, "DELETE", (responseObject: responseFromDatabase) => {
                res.status(responseObject.code).send(responseObject.message);
            });
        }
        else {
            res.status(400).send("Das Json Object hatte nicht die richtigen Felder");
        } 
    },
    method: E_METHOD.DELETE,
    endPoint: "/deleteUser/:userId"
}

routes.push(getUserById);
routes.push(deleteUserById);
routes.push(createUser);
routes.push(routeAbout);