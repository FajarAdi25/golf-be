import { Request, Response } from "express";
import { ToControllerResponse } from "../helper/to_controller_response";
import { StatusInternalServerError } from "../response/internal_server_error";
import { CustomerControllerInterface } from "./customer_controller";
import { CustomerServiceInterface } from "../service/customer_service";

class CustomerControllerImpl implements CustomerControllerInterface {
  private customerService: CustomerServiceInterface;

  constructor(customerService: CustomerServiceInterface) {
    this.customerService = customerService;
  }

  getCustomers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const customerService = await this.customerService.getCustomers(req);
      const responseCustomer = ToControllerResponse(customerService);
      return res.status(responseCustomer.code).json(responseCustomer);
    } catch (err) {
      const responseCustomer = ToControllerResponse(
        StatusInternalServerError(err)
      );
      return res.status(responseCustomer.code).json(responseCustomer);
    }
  };
  createCustomer = async (req: Request, res: Response): Promise<Response> => {
    try {
      const customerService = await this.customerService.createCustomer(req);

      const responseCustomer = ToControllerResponse(customerService);
      // console.log(customerService);

      return res.status(responseCustomer.code).json(responseCustomer);
    } catch (err) {
      const responseCustomer = ToControllerResponse(
        StatusInternalServerError(err)
      );
      return res.status(responseCustomer.code).json(responseCustomer);
    }
  };
  getCustomerById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const customerService = await this.customerService.getCustomerById(req);

      const responseCustomer = ToControllerResponse(customerService);
      return res.status(responseCustomer.code).json(responseCustomer);
    } catch (err) {
      const responseCustomer = ToControllerResponse(
        StatusInternalServerError(err)
      );
      return res.status(responseCustomer.code).json(responseCustomer);
    }
  };
  deleteCustomer = async (req: Request, res: Response): Promise<Response> => {
    try {
      const customerService = await this.customerService.deleteCustomer(req);

      const responseCustomer = ToControllerResponse(customerService);
      return res.status(responseCustomer.code).json(responseCustomer);
    } catch (err) {
      const responseCustomer = ToControllerResponse(
        StatusInternalServerError(err)
      );
      return res.status(responseCustomer.code).json(responseCustomer);
    }
  };
  updateCustomer = async (req: Request, res: Response): Promise<Response> => {
    try {
      const customerService = await this.customerService.updateCustomer(req);

      const responseCustomer = ToControllerResponse(customerService);
      return res.status(responseCustomer.code).json(responseCustomer);
    } catch (err) {
      const responseCustomer = ToControllerResponse(
        StatusInternalServerError(err)
      );
      return res.status(responseCustomer.code).json(responseCustomer);
    }
  };
}

export default CustomerControllerImpl;
