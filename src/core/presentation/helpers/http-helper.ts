import { Response } from "express";

export const sucess = (res: Response, data: any) => {
  return res.status(200).json({ data });
};

export const badRequest = (res: Response) => {
  return res.status(400).json({ error: "Invalid Data" });
};

export const notFound = (res: Response) => {
  return res.status(404).json({ error: "Data not found" });
};

export const serverError = (res: Response) => {
  return res.status(500).json({ error: "Internal Server Error" });
};
