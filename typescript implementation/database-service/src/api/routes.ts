import { E_METHOD } from "./generateRoutes";
import { Mongodb } from "../database/mongodb";
import { Request, Response } from "express";
import { getNextID } from "../logic/generateValues";
import { searchInSummit, deleteInSummit } from "../database/databaseOperation";
import { sendResponse } from "../logic/sendResponse";

export interface Route {
  callback: Function;
  method: E_METHOD;
  endPoint: string;
}

export let routes: Route[] = [
  {
    callback: async (req: Request, res: Response) => {
      let result = await searchInSummit(
        "userId",
        req.body.userId,
        "user",
        "summit",
        true
      );

      if (result.length != 0) {
        let ascents = await searchInSummit("", 0, "ascent", "summit", false);

        req.body["Id"] = getNextID(ascents, "Id");
        let insertCount = await (
          await Mongodb.client
            .db("summit")
            .collection("ascent")
            .insertOne(req.body)
        ).insertedCount;

        let returnOnSucess = {
          message: "Ascent was successfully added",
          ascentId: +req.body["Id"],
        };

        sendResponse(
          res,
          insertCount == 1,
          JSON.stringify(returnOnSucess),
          "There was an error when adding the ascent"
        );
      } else {
        res.status(400).send("There is no user with this ID");
      }
    },
    method: E_METHOD.POST,
    endPoint: "/createAscent",
  },
  {
    callback: async (req: Request, res: Response) => {
      let result = await searchInSummit(
        "name",
        req.body.name,
        "user",
        "summit",
        true
      );

      if (result.length == 0) {
        let users = await searchInSummit("", 0, "user", "summit", false);

        req.body["userId"] = getNextID(users, "userId");

        let insertCount = await (
          await Mongodb.client
            .db("summit")
            .collection("user")
            .insertOne(req.body)
        ).insertedCount;

        let returnOnSucess = {
          message: "User was successfully added",
          userId: +req.body["userId"],
        };
        sendResponse(
          res,
          insertCount == 1,
          JSON.stringify(returnOnSucess),
          "There was an error when adding the user"
        );
      } else {
        res.status(406).send(`The user ${req.body.name} already exists `);
      }
    },
    method: E_METHOD.POST,
    endPoint: "/createUser",
  },
  {
    callback: async (req: Request, res: Response) => {
      if (req.query.search && req.query.value) {
        let ascent = await searchInSummit(
          req.query.search.toString(),
          +req.query.value.toString(),
          "ascent",
          "summit",
          true
        );

        ascent.forEach((a) => {
          delete a["_id"];
        });

        sendResponse(
          res,
          ascent.length >= 1,
          JSON.stringify(ascent),
          `Ascent with the ${req.query.search} ${req.query.value} could not be found`
        );
      } else {
        res.status(400).send("The query did not have the correct query params");
      }
    },
    method: E_METHOD.GET,
    endPoint: "/getAscent",
  },
  {
    callback: async (req: Request, res: Response) => {
      if (req.query.search && req.query.value) {
        let countDeletet = await deleteInSummit(
          req.query.search.toString(),
          +req.query.value.toString(),
          "ascent",
          false
        );

        let returnOnSucess = {
          message: "Ascent successfully deleted",
          ascentId: +req.query.value,
        };

        sendResponse(
          res,
          countDeletet == 1,
          JSON.stringify(returnOnSucess),
          `Ascent with the ID ${req.query.value} could not be deleted(is there this Ascent ?)`
        );
      } else {
        res.status(400).send("The query did not have the correct query params");
      }
    },
    method: E_METHOD.DELETE,
    endPoint: "/deleteAscent",
  },
  {
    callback: async (req: Request, res: Response) => {
      if (req.query.search && req.query.value) {
        let countDeletet = await deleteInSummit(
          req.query.search.toString(),
          +req.query.value.toString(),
          "user",
          false
        );

        await deleteInSummit(
          "userId",
          +req.query.value.toString(),
          "ascent",
          true
        );

        let returnOnSucess = {
          message: "User successfully deleted",
          userId: +req.query.value,
        };

        sendResponse(
          res,
          countDeletet == 1,
          JSON.stringify(returnOnSucess),
          `User with ID ${req.query.value} could not be deleted (is there this user ?)`
        );
      }
    },
    method: E_METHOD.DELETE,
    endPoint: "/deleteUser",
  },
  {
    callback: async (req: Request, res: Response) => {
      if (req.query.search && req.query.value) {
        let user = await searchInSummit(
          req.query.search.toString(),
          +req.query.value.toString(),
          "user",
          "summit",
          true
        );

        user.forEach((u) => {
          delete u["_id"];
        });

        sendResponse(
          res,
          user.length >= 1,
          JSON.stringify(user[0]),
          `User with ${req.query.search} ${req.query.value} could not be found`
        );
      }
    },
    method: E_METHOD.GET,
    endPoint: "/getUser",
  },
];
