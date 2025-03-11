import { DataSource, QueryRunner } from "typeorm";
import { Request, Response } from "express";
import { ServiceResponseInterface } from "../helper/service_response";
import { CustomerServiceInterface } from "./customer_service";
import { validate } from "class-validator";
import { ToServiceResponse } from "../helper/toServiceResponse";
import { StatusInternalServerError } from "../response/internal_server_error";
import { StatusBadRequestError } from "../response/bad_request";
import { CustomerRepositoryInterface } from "../repository/customer_repository";
import { CustomerUpdateRequest } from "../helper/customer_update_request";
import { CustomerCreateRequest } from "../helper/customer_create_request";

class CustomerServiceImpl implements CustomerServiceInterface {
  private customerRepository: CustomerRepositoryInterface;
  private connection: DataSource;

  constructor(
    customerRepository: CustomerRepositoryInterface,
    connection: DataSource
  ) {
    this.customerRepository = customerRepository;
    this.connection = connection;
  }

  getCustomers = async (req: Request): Promise<ServiceResponseInterface> => {
    try {
      const r = await this.customerRepository.getCustomers(this.connection);
      return ToServiceResponse(r);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };
  getCustomerById = async (req: Request): Promise<ServiceResponseInterface> => {
    const id = req.params.id;
    // const customerAcc = req.params.customername;

    try {
      const r = await this.customerRepository.getCustomerById(
        this.connection,
        id
      );
      return ToServiceResponse(r);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };
  deleteCustomer = async (req: Request): Promise<ServiceResponseInterface> => {
    const id = req.params.id;
    // const customerAcc = req.params.customername;

    try {
      let r = await this.customerRepository.getCustomerById(
        this.connection,
        id
      );

      if (r.error) return ToServiceResponse(r);

      r = await this.customerRepository.deleteCustomer(this.connection, id);
      return ToServiceResponse(r);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };
  updateCustomer = async (req: Request): Promise<ServiceResponseInterface> => {
    const id = req.params.id;
    // const customerAcc = req.params.customername;

    try {
      const customerRequest = new CustomerUpdateRequest();
      customerRequest.company_name = req.body.company_name;
      customerRequest.company_code = req.body.company_code;
      customerRequest.company_address = req.body.company_address;
      customerRequest.company_address_building =
        req.body.company_address_building;
      customerRequest.company_street_number = req.body.company_street_number;
      customerRequest.company_street_name = req.body.company_street_name;
      customerRequest.company_building_no = req.body.company_building_no;
      customerRequest.company_building_unit = req.body.company_building_unit;
      customerRequest.company_building_name = req.body.company_building_name;
      customerRequest.company_city = req.body.company_city;
      customerRequest.company_state = req.body.company_state;
      customerRequest.company_country = req.body.company_country;
      customerRequest.company_zip_code = req.body.company_zip_code;
      customerRequest.company_fax = req.body.company_fax;
      customerRequest.company_website = req.body.company_website;
      customerRequest.company_pic = req.body.company_pic;
      customerRequest.company_designation = req.body.company_designation;
      customerRequest.company_email = req.body.company_email;
      customerRequest.company_phone = req.body.company_phone;
      // customerRequest.updated_by = req?.customer?.customerLogin;
      // console.log(customerRequest);

      const errors = await validate(customerRequest);
      if (errors.length > 0) return StatusBadRequestError(errors);

      const customer = await this.customerRepository.updateCustomer(
        this.connection,
        id,
        customerRequest
      );
      if (customer.error) return ToServiceResponse(customer);

      return ToServiceResponse(customer);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };
  createCustomer = async (req: Request): Promise<ServiceResponseInterface> => {
    try {
      const customerRequest = new CustomerCreateRequest();

      customerRequest.company_name = req.body.company_name;
      customerRequest.company_code = req.body.company_code;
      customerRequest.company_address = req.body.company_address;
      customerRequest.company_address_building =
        req.body.company_address_building;
      customerRequest.company_street_number = req.body.company_street_number;
      customerRequest.company_street_name = req.body.company_street_name;
      customerRequest.company_building_no = req.body.company_building_no;
      customerRequest.company_building_unit = req.body.company_building_unit;
      customerRequest.company_building_name = req.body.company_building_name;
      customerRequest.company_city = req.body.company_city;
      customerRequest.company_state = req.body.company_state;
      customerRequest.company_country = req.body.company_country;
      customerRequest.company_zip_code = req.body.company_zip_code;
      customerRequest.company_fax = req.body.company_fax;
      customerRequest.company_website = req.body.company_website;
      customerRequest.company_pic = req.body.company_pic;
      customerRequest.company_designation = req.body.company_designation;
      customerRequest.company_email = req.body.company_email;
      customerRequest.company_phone = req.body.company_phone;

      // (customerRequest.created_by = req?.customer?.customerLogin);
      // console.log(customerRequest);

      const errors = await validate(customerRequest);
      if (errors.length > 0) return StatusBadRequestError(errors);

      const customer = await this.customerRepository.createCustomer(
        this.connection,
        customerRequest
      );
      if (customer.error) return ToServiceResponse(customer);

      return ToServiceResponse(customer);
    } catch (err) {
      return ToServiceResponse(err);
    }
  };
}

export default CustomerServiceImpl;
