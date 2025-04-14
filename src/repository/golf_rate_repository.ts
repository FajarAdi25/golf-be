import { DataSource, QueryRunner } from "typeorm";
import { RepositoryResponseInterface } from "../helper/repository_response";
import { GolfRateCreateRequest } from "../helper/golf_rate_create_request";
import { GolfRateUpdateRequest } from "../helper/golf_rate_update_request";
import { NATIONALITY } from "../entity/golf_rates";

export interface GolfRateRepositoryInterface {
  getGolfRates(
    conn: QueryRunner | DataSource
  ): Promise<RepositoryResponseInterface>;
  getGolfRateById(
    conn: QueryRunner | DataSource,
    id: number
  ): Promise<RepositoryResponseInterface>;
  getGolfRatesByNationality(
    conn: QueryRunner | DataSource,
    nationality: NATIONALITY
  ): Promise<RepositoryResponseInterface>;
  createGolfRate(
    conn: QueryRunner | DataSource,
    request: GolfRateCreateRequest
  ): Promise<RepositoryResponseInterface>;
  deleteGolfRate(
    conn: QueryRunner | DataSource,
    id: number
  ): Promise<RepositoryResponseInterface>;
  updateGolfRate(
    conn: QueryRunner | DataSource,
    id: number,
    request: GolfRateUpdateRequest
  ): Promise<RepositoryResponseInterface>;
}
