import { ServiceResponseInterface } from "../api/service_response";
import { Request, Response } from "express";

export interface CustomerServiceInterface {
  getCustomers(req: Request): Promise<ServiceResponseInterface>;
  getCustomerById(req: Request): Promise<ServiceResponseInterface>;
  createCustomer(req: Request): Promise<ServiceResponseInterface>;
  updateCustomer(req: Request): Promise<ServiceResponseInterface>;
  deleteCustomer(req: Request): Promise<ServiceResponseInterface>;
}
