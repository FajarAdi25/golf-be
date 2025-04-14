import { DataSource } from "typeorm";
import { Request } from "express";
import { GolfRateServiceInterface } from "./golf_rate_service";
import { GolfRateRepositoryInterface } from "../repository/golf_rate_repository";
import { ServiceResponseInterface } from "../helper/service_response";
import { StatusBadRequestError } from "../response/bad_request";
import { StatusInternalServerError } from "../response/internal_server_error";
import { GolfRateCreateRequest } from "../helper/golf_rate_create_request";
import { GolfRateUpdateRequest } from "../helper/golf_rate_update_request";
import { ToServiceResponse } from "../helper/toServiceResponse";
import { validate } from "class-validator";
import { NATIONALITY } from "../entity/golf_rates";

class GolfRateServiceImpl implements GolfRateServiceInterface {
  private golfRateRepository: GolfRateRepositoryInterface;
  private dataSource: DataSource;

  constructor(
    golfRateRepository: GolfRateRepositoryInterface,
    dataSource: DataSource
  ) {
    this.golfRateRepository = golfRateRepository;
    this.dataSource = dataSource;
  }

  getGolfRates = async (req: Request): Promise<ServiceResponseInterface> => {
    try {
      const result = await this.golfRateRepository.getGolfRates(
        this.dataSource
      );
      return ToServiceResponse(result);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };

  getGolfRateById = async (req: Request): Promise<ServiceResponseInterface> => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return StatusBadRequestError("Invalid ID format");
      }

      const result = await this.golfRateRepository.getGolfRateById(
        this.dataSource,
        id
      );
      return ToServiceResponse(result);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };

  getGolfRatesByNationality = async (
    req: Request
  ): Promise<ServiceResponseInterface> => {
    try {
      const { nationality } = req.params;

      // Validate nationality parameter
      if (
        !nationality ||
        !Object.values(NATIONALITY).includes(nationality as NATIONALITY)
      ) {
        return StatusBadRequestError(
          "Invalid nationality. Must be either 'Malaysian' or 'Non-Malaysian'"
        );
      }

      const result = await this.golfRateRepository.getGolfRatesByNationality(
        this.dataSource,
        nationality as NATIONALITY
      );
      return ToServiceResponse(result);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };

  createGolfRate = async (req: Request): Promise<ServiceResponseInterface> => {
    try {
      // Create and populate request object
      const golfRateRequest = new GolfRateCreateRequest();
      Object.assign(golfRateRequest, req.body);

      // Validate using class-validator
      const errors = await validate(golfRateRequest);
      if (errors.length > 0) return StatusBadRequestError(errors);

      // Create golf rate
      const result = await this.golfRateRepository.createGolfRate(
        this.dataSource,
        golfRateRequest
      );

      return ToServiceResponse(result);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };

  updateGolfRate = async (req: Request): Promise<ServiceResponseInterface> => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return StatusBadRequestError("Invalid ID format");
      }

      // First check if golf rate exists
      const existingGolfRate = await this.golfRateRepository.getGolfRateById(
        this.dataSource,
        id
      );

      if (existingGolfRate.error) return ToServiceResponse(existingGolfRate);

      // Create and populate request object
      const golfRateRequest = new GolfRateUpdateRequest();
      Object.assign(golfRateRequest, req.body);

      // Validate using class-validator
      const errors = await validate(golfRateRequest);
      if (errors.length > 0) return StatusBadRequestError(errors);

      // Update golf rate
      const result = await this.golfRateRepository.updateGolfRate(
        this.dataSource,
        id,
        golfRateRequest
      );

      return ToServiceResponse(result);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };

  deleteGolfRate = async (req: Request): Promise<ServiceResponseInterface> => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return StatusBadRequestError("Invalid ID format");
      }

      // First check if golf rate exists
      const existingGolfRate = await this.golfRateRepository.getGolfRateById(
        this.dataSource,
        id
      );

      if (existingGolfRate.error) return ToServiceResponse(existingGolfRate);

      const result = await this.golfRateRepository.deleteGolfRate(
        this.dataSource,
        id
      );

      return ToServiceResponse(result);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };
}

export default GolfRateServiceImpl;
