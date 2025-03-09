import CustomerControllerImpl from "../controllers/customer_controller_impl";
import { AppDataSource } from "../data-source";
import CustomerRepositoryImpl from "../repository/customer_repository_impl";
import CustomerServiceImpl from "../service/customer_service_impl";

// user
const customerRepository = new CustomerRepositoryImpl();
const customerService = new CustomerServiceImpl(
  customerRepository,
  AppDataSource
);
export const customerController = new CustomerControllerImpl(customerService);
