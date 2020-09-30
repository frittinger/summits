const request = require('request');
import Request from "request";

export interface responseFromDatabase
{
    code: number;
    message: string;
};

export function sendPostRequest(endPoint: string, data: any, callback: Function) {
    
    let requestOptions = {
        url: 'http://localhost:29000/' + endPoint,
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    new Promise<any>((resolve,reject) => {

        request(requestOptions, function (error: any, response: Request.Response){

            let responseObeject: responseFromDatabase = {
                code: response.statusCode,
                message: response.body

            };
            resolve(responseObeject);
        })
    }).then(responseObeject => { callback(responseObeject) });
    
}
export function sendGetRequest(endPoint: string, method: string, callback: Function) {
    
        let requestOptions = {
            url: 'http://localhost:29000/' + endPoint,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        new Promise<any>((resolve, reject) => {
            request(requestOptions, function (error: any, response: Request.Response) {

                let responseObeject: responseFromDatabase = {
                    code: response.statusCode,
                    message: response.body

                };
                resolve(responseObeject);
            })
        }).then(responseObeject => {callback(responseObeject)});
}