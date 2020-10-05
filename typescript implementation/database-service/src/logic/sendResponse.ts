import { Response } from "express";

export function sendResponse(
  res: Response,
  isResponseFine: boolean,
  fineMessage: string,
  notFineMessage: string
) {
  if (isResponseFine) {
    res.status(200).send(fineMessage);
  } else {
    res.status(500).send(notFineMessage);
  }
}
