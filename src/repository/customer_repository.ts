import { DataSource, QueryRunner } from "typeorm";
import { RepositoryResponseInterface } from "../helper/repository_response";
import { CustomerCreateRequest } from "../helper/customer_create_request";
import { CustomerUpdateRequest } from "../helper/customer_update_request";

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
    request: CustomerCreateRequest,
    categories?: number[]
  ): Promise<RepositoryResponseInterface>;
  deleteCustomer(
    conn: QueryRunner | DataSource,
    id: number
  ): Promise<RepositoryResponseInterface>;
  updateCustomer(
    conn: QueryRunner | DataSource,
    id: number,
    request: CustomerUpdateRequest,
    categories?: number[]
  ): Promise<RepositoryResponseInterface>;
}
