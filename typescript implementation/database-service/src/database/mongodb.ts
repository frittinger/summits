import * as mongodb from "mongodb";

export const dbSettings = {
  url: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:27017/`,
};

export class Mongodb {
  public static client: mongodb.MongoClient;

  public static connect(): Promise<mongodb.MongoClient> {
    return new Promise<mongodb.MongoClient>((resolve, reject) => {
      mongodb.MongoClient.connect(
        dbSettings.url,
        (err, client: mongodb.MongoClient) => {
          if (err) {
            reject(err);
          } else {
            Mongodb.client = client;
            resolve(client);
          }
        }
      );
    });
  }
}
