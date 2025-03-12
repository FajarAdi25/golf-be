import { RepositoryResponseInterface } from "../helper/repository_response";
import { DataSource, QueryRunner } from "typeorm";
import { CustomerRepositoryInterface } from "././customer_repository";
import { Customers } from "../entity/customers";
import { StatusOK } from "../response/ok";
import { StatusInternalServerError } from "../response/internal_server_error";
import { StatusNotFoundError } from "../response/not_found_error";
import { exec } from "child_process";
import { CustomerUpdateRequest } from "../helper/customer_update_request";
import { CustomerCreateRequest } from "../helper/customer_create_request";

class CustomerRepositoryImpl implements CustomerRepositoryInterface {
  getCustomers = async (
    conn: QueryRunner | DataSource
  ): Promise<RepositoryResponseInterface> => {
    try {
      const query = `SELECT c.*, GROUP_CONCAT(cat.category_name SEPARATOR ', ') AS categories
                      FROM company c
                      JOIN company_category cc ON c.id = cc.company_id
                      JOIN category cat ON cc.category_id = cat.id
                      WHERE c.active_status_id = 1
                      GROUP BY c.id;`;

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
      const query = `SELECT c.*, GROUP_CONCAT(cat.category_name SEPARATOR ', ') AS categories
                      FROM company c
                      JOIN company_category cc ON c.id = cc.company_id
                      JOIN category cat ON cc.category_id = cat.id
                      WHERE c.id = ${id} AND c.active_status_id = 1
                      GROUP BY c.id;`;
      const d = await conn.manager.query(query);
      // console.log(d);

      if (d.length < 1)
        return StatusNotFoundError(new Error(`id ${id} is not found`));
      return StatusOK(d[0]);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };

  // Helper method to map request to entity
  private mapRequestToEntity = <
    T extends CustomerCreateRequest | CustomerUpdateRequest
  >(
    request: T
  ): Customers => {
    const customer = new Customers();

    // Map all properties from request to entity
    const propertyKeys = [
      "company_name",
      "company_code",
      "company_address",
      "company_address_building",
      "company_street_number",
      "company_street_name",
      "company_building_no",
      "company_building_unit",
      "company_building_name",
      "company_city",
      "company_state",
      "company_country",
      "company_zip_code",
      "company_fax",
      "company_website",
      "company_pic",
      "company_designation",
      "company_email",
      "company_phone",
    ];

    propertyKeys.forEach((key) => {
      if (request[key] !== undefined) {
        customer[key] = request[key];
      }
    });

    return customer;
  };

  // Helper method to handle category associations
  private async handleCategories(
    conn: QueryRunner | DataSource,
    customerId: number,
    categories: number[]
  ): Promise<void> {
    if (!categories || categories.length === 0) return;

    // Delete existing categories
    await conn.manager.query(
      `DELETE FROM company_category WHERE company_id = ${customerId}`
    );

    // Insert new categories
    for (const categoryId of categories) {
      await conn.manager.query(
        `INSERT INTO company_category (company_id, category_id) VALUES (${customerId}, ${categoryId})`
      );
    }
  }

  createCustomer = async (
    conn: QueryRunner | DataSource,
    request: CustomerCreateRequest,
    categories: number[] = []
  ): Promise<RepositoryResponseInterface> => {
    const queryRunner =
      conn instanceof DataSource ? conn.createQueryRunner() : conn;

    try {
      // Start transaction
      await queryRunner.startTransaction();

      // Map request to entity
      const customer = this.mapRequestToEntity(request);
      customer.active_status_id = 1;

      // Save customer
      const savedCustomer = await queryRunner.manager.save(customer);

      // Handle categories
      await this.handleCategories(queryRunner, savedCustomer.id, categories);

      // Commit transaction
      await queryRunner.commitTransaction();

      return StatusOK(savedCustomer);
    } catch (err) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      return StatusInternalServerError(err);
    } finally {
      // Release query runner if we created it
      if (!(conn instanceof DataSource)) {
        await queryRunner.release();
      }
    }
  };

  updateCustomer = async (
    conn: QueryRunner | DataSource,
    id: number,
    request: CustomerUpdateRequest,
    categories: number[] = []
  ): Promise<RepositoryResponseInterface> => {
    const queryRunner =
      conn instanceof DataSource ? conn.createQueryRunner() : conn;

    try {
      // Start transaction
      await queryRunner.startTransaction();

      // Map request to entity
      const customer = this.mapRequestToEntity(request);

      // Update customer
      await queryRunner.manager.update(Customers, id, customer);

      // Handle categories
      await this.handleCategories(queryRunner, id, categories);

      // Commit transaction
      await queryRunner.commitTransaction();

      // Get updated customer
      const updatedCustomer = await this.getCustomerById(conn, id);
      return updatedCustomer;
    } catch (err) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      return StatusInternalServerError(err);
    } finally {
      // Release query runner if we created it
      if (!(conn instanceof DataSource)) {
        await queryRunner.release();
      }
    }
  };
  // createCustomer = async (
  //   conn: QueryRunner | DataSource,
  //   r: CustomerCreateRequest
  // ): Promise<RepositoryResponseInterface> => {
  //   try {
  //     let customer = new Customers();
  //     customer.company_name = r.company_name;
  //     customer.company_code = r.company_code;
  //     customer.company_address = r.company_address;
  //     customer.company_address_building = r.company_address_building;
  //     customer.company_street_number = r.company_street_number;
  //     customer.company_street_name = r.company_street_name;
  //     customer.company_building_no = r.company_building_no;
  //     customer.company_building_unit = r.company_building_unit;
  //     customer.company_building_name = r.company_building_name;
  //     customer.company_city = r.company_city;
  //     customer.company_state = r.company_state;
  //     customer.company_country = r.company_country;
  //     customer.company_zip_code = r.company_zip_code;
  //     customer.company_fax = r.company_fax;
  //     customer.company_website = r.company_website;
  //     customer.company_pic = r.company_pic;
  //     customer.company_designation = r.company_designation;
  //     customer.company_email = r.company_email;
  //     customer.company_phone = r.company_phone;
  //     // customer.active_status_id = 1;
  //     // customer.created_by = r.created_by;
  //     // console.log(customer);

  //     const execute = await conn.manager.save(customer);
  //     return StatusOK(execute);
  //   } catch (err) {
  //     return StatusInternalServerError(err);
  //   }
  // };
  // updateCustomer = async (
  //   conn: QueryRunner | DataSource,
  //   id: number,
  //   r: CustomerUpdateRequest
  // ): Promise<RepositoryResponseInterface> => {
  //   try {
  //     let customer = new Customers();
  //     customer.company_name = r.company_name;
  //     customer.company_code = r.company_code;
  //     customer.company_address = r.company_address;
  //     customer.company_address_building = r.company_address_building;
  //     customer.company_street_number = r.company_street_number;
  //     customer.company_street_name = r.company_street_name;
  //     customer.company_building_no = r.company_building_no;
  //     customer.company_building_unit = r.company_building_unit;
  //     customer.company_building_name = r.company_building_name;
  //     customer.company_city = r.company_city;
  //     customer.company_state = r.company_state;
  //     customer.company_country = r.company_country;
  //     customer.company_zip_code = r.company_zip_code;
  //     customer.company_fax = r.company_fax;
  //     customer.company_website = r.company_website;
  //     customer.company_pic = r.company_pic;
  //     customer.company_designation = r.company_designation;
  //     customer.company_email = r.company_email;
  //     customer.company_phone = r.company_phone;
  //     // customer.active_status_id = 1;
  //     // customer.updated_by = r.updated_by;

  //     const execute = await conn.manager.update(Customers, id, customer);
  //     return StatusOK(execute);
  //   } catch (err) {
  //     return StatusInternalServerError(err);
  //   }
  // };
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
