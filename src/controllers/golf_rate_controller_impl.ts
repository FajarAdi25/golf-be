import { Request, Response } from "express";
import { ToControllerResponse } from "../helper/to_controller_response";
import { StatusInternalServerError } from "../response/internal_server_error";
import { GolfRateControllerInterface } from "./golf_rate_controller";
import { GolfRateServiceInterface } from "../service/golf_rate_service";

class GolfRateControllerImpl implements GolfRateControllerInterface {
  private golfRateService: GolfRateServiceInterface;

  constructor(golfRateService: GolfRateServiceInterface) {
    this.golfRateService = golfRateService;
  }

  getGolfRates = async (req: Request, res: Response): Promise<Response> => {
    try {
      const golfRateService = await this.golfRateService.getGolfRates(req);
      const responseGolfRate = ToControllerResponse(golfRateService);
      return res.status(responseGolfRate.code).json(responseGolfRate);
    } catch (err) {
      const responseGolfRate = ToControllerResponse(
        StatusInternalServerError(err)
      );
      return res.status(responseGolfRate.code).json(responseGolfRate);
    }
  };

  getGolfRateById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const golfRateService = await this.golfRateService.getGolfRateById(req);
      const responseGolfRate = ToControllerResponse(golfRateService);
      return res.status(responseGolfRate.code).json(responseGolfRate);
    } catch (err) {
      const responseGolfRate = ToControllerResponse(
        StatusInternalServerError(err)
      );
      return res.status(responseGolfRate.code).json(responseGolfRate);
    }
  };

  getGolfRatesByNationality = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const golfRateService =
        await this.golfRateService.getGolfRatesByNationality(req);
      const responseGolfRate = ToControllerResponse(golfRateService);
      return res.status(responseGolfRate.code).json(responseGolfRate);
    } catch (err) {
      const responseGolfRate = ToControllerResponse(
        StatusInternalServerError(err)
      );
      return res.status(responseGolfRate.code).json(responseGolfRate);
    }
  };

  createGolfRate = async (req: Request, res: Response): Promise<Response> => {
    try {
      const golfRateService = await this.golfRateService.createGolfRate(req);
      const responseGolfRate = ToControllerResponse(golfRateService);
      return res.status(responseGolfRate.code).json(responseGolfRate);
    } catch (err) {
      const responseGolfRate = ToControllerResponse(
        StatusInternalServerError(err)
      );
      return res.status(responseGolfRate.code).json(responseGolfRate);
    }
  };

  deleteGolfRate = async (req: Request, res: Response): Promise<Response> => {
    try {
      const golfRateService = await this.golfRateService.deleteGolfRate(req);
      const responseGolfRate = ToControllerResponse(golfRateService);
      return res.status(responseGolfRate.code).json(responseGolfRate);
    } catch (err) {
      const responseGolfRate = ToControllerResponse(
        StatusInternalServerError(err)
      );
      return res.status(responseGolfRate.code).json(responseGolfRate);
    }
  };

  updateGolfRate = async (req: Request, res: Response): Promise<Response> => {
    try {
      const golfRateService = await this.golfRateService.updateGolfRate(req);
      const responseGolfRate = ToControllerResponse(golfRateService);
      return res.status(responseGolfRate.code).json(responseGolfRate);
    } catch (err) {
      const responseGolfRate = ToControllerResponse(
        StatusInternalServerError(err)
      );
      return res.status(responseGolfRate.code).json(responseGolfRate);
    }
  };
}

export default GolfRateControllerImpl;
