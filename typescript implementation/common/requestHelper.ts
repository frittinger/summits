const fetch = require("node-fetch");

export interface responseFromDatabase {
  status: number;
  text(): Promise<string>;
}

export const sendPostRequest = (
  endPoint: string,
  data: any,
  callback: Function
) => {
  fetch(process.env.DATABASE_SERVER + endPoint, {
    method: "post",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }).then(async (responseObeject: Response) => {
    callback(responseObeject);
  });
};
export const sendGetRequest = (
  endPoint: string,
  method: string,
  callback: Function
) => {
  fetch(process.env.DATABASE_SERVER + endPoint, {
    method: method,
    headers: { "Content-Type": "application/json" },
  }).then(async (responseObeject: Response) => {
    callback(responseObeject);
  });
};
