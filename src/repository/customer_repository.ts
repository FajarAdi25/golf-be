import { DataSource, QueryRunner } from "typeorm";
import { RepositoryResponseInterface } from "../api/repository_response";
import { CustomerCreateRequest } from "../api/customer_create_request";
import { CustomerUpdateRequest } from "../api/customer_update_request";

export interface CustomerRepositoryInterface {
  getCustomers(
    conn: QueryRunner | DataSource
  ): Promise<RepositoryResponseInterface>;
  getCustomerById(
    conn: QueryRunner | DataSource,
    id: number
  ): Promise<RepositoryResponseInterface>;
  createCustomer(
    conn: QueryRunner | DataSource,
    r: CustomerCreateRequest
  ): Promise<RepositoryResponseInterface>;
  deleteCustomer(
    conn: QueryRunner | DataSource,
    id: number
  ): Promise<RepositoryResponseInterface>;
  updateCustomer(
    conn: QueryRunner | DataSource,
    id: number,
    r: CustomerUpdateRequest
  ): Promise<RepositoryResponseInterface>;
}
