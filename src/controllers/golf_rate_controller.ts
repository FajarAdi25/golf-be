import { Request, Response } from "express";

export interface GolfRateControllerInterface {
  getGolfRates(req: Request, res: Response): Response;
  getGolfRateById(req: Request, res: Response): Response;
  getGolfRatesByNationality(req: Request, res: Response): Response;
  createGolfRate(req: Request, res: Response): Response;
  updateGolfRate(req: Request, res: Response): Response;
  deleteGolfRate(req: Request, res: Response): Response;
}
