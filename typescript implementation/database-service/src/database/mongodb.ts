import * as mongodb from 'mongodb';

const USER =  "summit";
const PASSWORD = "summit";

export const dbSettings = {
    url: `mongodb://${USER}:${PASSWORD}@localhost:27017/`
}

export class Mongodb {

    public static client: mongodb.MongoClient;

    public static connect(): Promise<mongodb.MongoClient>
    {
        return new Promise<mongodb.MongoClient>((resolve,reject) => {

                mongodb.MongoClient.connect(dbSettings.url, (err, client:mongodb.MongoClient) => {
                    if(err)
                    {
                        reject(err);
                    }
                    else
                    {
                        Mongodb.client = client;
                        resolve(client);
                    }
                });
        });
    }
}
