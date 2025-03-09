import { RepositoryResponseInterface } from "../api/repository_response";
import { DataSource, QueryRunner } from "typeorm";
import { CustomerRepositoryInterface } from "././customer_repository";
import { Customers } from "../entity/customers";
import { StatusOK } from "../response/ok";
import { StatusInternalServerError } from "../response/internal_server_error";
import { StatusNotFoundError } from "../response/not_found_error";
import { exec } from "child_process";
import { CustomerUpdateRequest } from "../api/customer_update_request";
import { CustomerCreateRequest } from "../api/customer_create_request";

class CustomerRepositoryImpl implements CustomerRepositoryInterface {
  getCustomers = async (
    conn: QueryRunner | DataSource
  ): Promise<RepositoryResponseInterface> => {
    try {
      const query = `SELECT * FROM customers c WHERE c.active_status_id = 1`;

      const d = await conn.query(query);
      // console.log(d);

      return StatusOK(d);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };
  getCustomerById = async (
    conn: QueryRunner | DataSource,
    id: number
  ): Promise<RepositoryResponseInterface> => {
    try {
      const query = `SELECT * FROM customers c WHERE c.id = ${id} AND c.active_status_id = 1`;

      const d = await conn.manager.query(query);
      // console.log(d);

      if (d.length < 1)
        return StatusNotFoundError(new Error(`id ${id} is not found`));
      return StatusOK(d[0]);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };

  createCustomer = async (
    conn: QueryRunner | DataSource,
    r: CustomerCreateRequest
  ): Promise<RepositoryResponseInterface> => {
    try {
      let customer = new Customers();
      customer.company_name = r.company_name;
      customer.company_code = r.company_code;
      customer.company_address = r.company_address;
      customer.company_address_building = r.company_address_building;
      customer.company_street_number = r.company_street_number;
      customer.company_street_name = r.company_street_name;
      customer.company_building_no = r.company_building_no;
      customer.company_building_unit = r.company_building_unit;
      customer.company_building_name = r.company_building_name;
      customer.company_city = r.company_city;
      customer.company_state = r.company_state;
      customer.company_country = r.company_country;
      customer.company_zip_code = r.company_zip_code;
      customer.company_fax = r.company_fax;
      customer.company_website = r.company_website;
      customer.company_pic = r.company_pic;
      customer.company_designation = r.company_designation;
      customer.company_email = r.company_email;
      customer.company_phone = r.company_phone;
      // customer.active_status_id = 1;
      // customer.created_by = r.created_by;
      // console.log(customer);

      const execute = await conn.manager.save(customer);
      return StatusOK(execute);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };
  updateCustomer = async (
    conn: QueryRunner | DataSource,
    id: number,
    r: CustomerUpdateRequest
  ): Promise<RepositoryResponseInterface> => {
    try {
      let customer = new Customers();
      customer.company_name = r.company_name;
      customer.company_code = r.company_code;
      customer.company_address = r.company_address;
      customer.company_address_building = r.company_address_building;
      customer.company_street_number = r.company_street_number;
      customer.company_street_name = r.company_street_name;
      customer.company_building_no = r.company_building_no;
      customer.company_building_unit = r.company_building_unit;
      customer.company_building_name = r.company_building_name;
      customer.company_city = r.company_city;
      customer.company_state = r.company_state;
      customer.company_country = r.company_country;
      customer.company_zip_code = r.company_zip_code;
      customer.company_fax = r.company_fax;
      customer.company_website = r.company_website;
      customer.company_pic = r.company_pic;
      customer.company_designation = r.company_designation;
      customer.company_email = r.company_email;
      customer.company_phone = r.company_phone;
      // customer.active_status_id = 1;
      // customer.updated_by = r.updated_by;

      const execute = await conn.manager.update(Customers, id, customer);
      return StatusOK(execute);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };
  deleteCustomer = async (
    conn: QueryRunner | DataSource,
    id: number
  ): Promise<RepositoryResponseInterface> => {
    try {
      let customer = new Customers();
      customer.active_status_id = 0;
      // customer.deleted_by = null;
      const execute = await conn.manager.update(Customers, id, customer);
      return StatusOK(execute);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };
}

export default CustomerRepositoryImpl;
