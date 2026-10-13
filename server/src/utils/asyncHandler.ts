import { NextFunction, Request, Response } from "express";

const aysncHandler =
  (
    controllerfn: (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => Promise<void>,
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(controllerfn(req, res, next)).catch(next);
  };

export default aysncHandler;
