import { Express } from "express";
import { Request, Response } from "express";
import { Route } from "./routes";

export enum E_METHOD {
  GET,
  POST,
  DELETE,
  PUT,
}

export const generateRoute = (app: Express, route: Route): string => {
  switch (route.method) {
    case E_METHOD.GET:
      app.get(route.endPoint, (req: Request, res: Response) => {
        route.callback(req, res);
      });
      break;

    case E_METHOD.POST:
      app.post(route.endPoint, (req: Request, res: Response) => {
        route.callback(req, res);
      });
      break;

    case E_METHOD.DELETE:
      app.delete(route.endPoint, (req: Request, res: Response) => {
        route.callback(req, res);
      });
      break;

    case E_METHOD.PUT:
      app.put(route.endPoint, (req: Request, res: Response) => {
        route.callback(req, res);
      });
      break;

    default:
      return `Error ${route.method} is not supported`;
  }

  return "Route created!";
};
