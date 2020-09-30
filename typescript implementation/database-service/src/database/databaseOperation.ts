import { Mongodb } from './mongodb'
import { DeleteWriteOpResultObject} from "mongodb"

interface databaseQuery { 
    [key: string]: number | string
}

export async function searchInSummit(search: string, value: number | string, collection: string, database: string, useQuery: boolean): Promise<Array<any>> {
    
    var query: databaseQuery = {};

    if (useQuery)
        query[search] = value;

    const cursor = await Mongodb.client.db(database).collection(collection).find(query);

    let result: any = [];

    return new Promise<Array<any>>(async (resolve, rejects) => {

        await cursor.forEach((entry) => {

            result.push(entry);
        });
        resolve(result);
    });
}

export async function deleteInSummit(search: string, value: number | string, collection: string, deleteAll: boolean): Promise<number> {
    
    var query: databaseQuery = {};

    query[search] = value;
    
    let collectionDB = Mongodb.client.db("summit").collection(collection);

    let cursor: DeleteWriteOpResultObject;

    if(deleteAll)
        cursor = await collectionDB.deleteMany(query);
    else
        cursor = await collectionDB.deleteOne(query);


    return new Promise<number>((resolve, reject) => {

        resolve(cursor.deletedCount);
    });
}