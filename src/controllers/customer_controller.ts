import { Request, Response } from "express";

export interface CustomerControllerInterface {
  getCustomers(req: Request, res: Response): Response;
  getCustomerById(req: Request, res: Response): Response;
  createCustomer(req: Request, res: Response): Response;
  updateCustomer(req: Request, res: Response): Response;
  deleteCustomer(req: Request, res: Response): Response;
}
