import { E_METHOD } from "./generateRoutes";
import { Request, Response } from "express";
import { sendPostRequest, sendGetRequest } from "../../../common/requestHelper";
import { responseFromDatabase } from "../../../common/requestHelper";

export interface Route {
  callback: Function;
  method: E_METHOD;
  endPoint: string;
}

const checkJson = (jsonObject: any) => {
  return (
    jsonObject.summitId &&
    jsonObject.userId &&
    jsonObject.ascentDate &&
    jsonObject.status &&
    jsonObject.tourType
  );
};

export let routes: Route[] = [
  {
    callback: (req: Request, res: Response) => {
      const aboutInfo = {
        name: process.env.NAME,
        version: process.env.VERSION,
      };
      res.status(200).json(aboutInfo);
    },
    method: E_METHOD.GET,
    endPoint: "/about",
  },
  {
    callback: (req: Request, res: Response) => {
      if (checkJson(req.body)) {
        sendPostRequest(
          "createAscent",
          req.body,
          async (responseObject: responseFromDatabase) => {
            let statusText = await responseObject.text();
            res.status(responseObject.status).send(statusText);
          }
        );
      } else {
        res.status(400).send("The Json Object did not have the correct fields");
      }
    },
    method: E_METHOD.POST,
    endPoint: "/createAscent",
  },
  {
    callback: (req: Request, res: Response) => {
      if (req.params.ascentId && !isNaN(+req.params.ascentId)) {
        sendGetRequest(
          `getAscent?search=Id&value=${req.params.ascentId}`,
          "GET",
          async (responseObject: responseFromDatabase) => {
            let statusText = await responseObject.text();
            res.status(responseObject.status).send(statusText);
          }
        );
      } else {
        res
          .status(400)
          .send(
            "The path did not have the correct field or was not an integer"
          );
      }
    },
    method: E_METHOD.GET,
    endPoint: "/getAscent/:ascentId",
  },
  {
    callback: (req: Request, res: Response) => {
      if (req.params.ascentId && !isNaN(+req.params.ascentId)) {
        sendGetRequest(
          `deleteAscent?search=Id&value=${req.params.ascentId}`,
          "DELETE",
          async (responseObject: responseFromDatabase) => {
            let statusText = await responseObject.text();
            res.status(responseObject.status).send(statusText);
          }
        );
      } else {
        res
          .status(400)
          .send(
            "The path did not have the correct field or was not an integer"
          );
      }
    },
    method: E_METHOD.DELETE,
    endPoint: "/deleteAscent/:ascentId",
  },
  {
    callback: async (req: Request, res: Response) => {
      if (req.params.summitId && !isNaN(+req.params.summitId)) {
        sendGetRequest(
          `getAscent?search=summitId&value=${req.params.summitId}`,
          "GET",
          async (responseObject: responseFromDatabase) => {
            let statusText = await responseObject.text();
            res.status(responseObject.status).send(statusText);
          }
        );
      } else {
        res
          .status(400)
          .send(
            "The path did not have the correct field or was not an integer"
          );
      }
    },
    method: E_METHOD.GET,
    endPoint: "/getAscentsBySummit/:summitId",
  },
  {
    callback: async (req: Request, res: Response) => {
      if (req.params.userId && !isNaN(+req.params.userId)) {
        sendGetRequest(
          `getAscent?search=userId&value=${req.params.userId}`,
          "GET",
          async (responseObject: responseFromDatabase) => {
            let statusText = await responseObject.text();
            res.status(responseObject.status).send(statusText);
          }
        );
      } else {
        res
          .status(400)
          .send(
            "The path did not have the correct field or was not an integer"
          );
      }
    },
    method: E_METHOD.GET,
    endPoint: "/getAscentsByUser/:userId",
  },
];
