import { ServiceResponseInterface } from "../helper/service_response";
import { Request } from "express";

export interface GolfRateServiceInterface {
  getGolfRates(req: Request): Promise<ServiceResponseInterface>;
  getGolfRateById(req: Request): Promise<ServiceResponseInterface>;
  getGolfRatesByNationality(req: Request): Promise<ServiceResponseInterface>;
  createGolfRate(req: Request): Promise<ServiceResponseInterface>;
  updateGolfRate(req: Request): Promise<ServiceResponseInterface>;
  deleteGolfRate(req: Request): Promise<ServiceResponseInterface>;
}
