import CustomerControllerImpl from "../controllers/customer_controller_impl";
import { AppDataSource } from "../data-source";
import CustomerRepositoryImpl from "../repository/customer_repository_impl";
import CustomerServiceImpl from "../service/customer_service_impl";
import GolfRateControllerImpl from "../controllers/golf_rate_controller_impl";
import GolfRateRepositoryImpl from "../repository/golf_rate_repository_impl";
import GolfRateServiceImpl from "../service/golf_rate_service_impl";

// user
const customerRepository = new CustomerRepositoryImpl();
const customerService = new CustomerServiceImpl(
  customerRepository,
  AppDataSource
);
export const customerController = new CustomerControllerImpl(customerService);

// golf rate
const golfRateRepository = new GolfRateRepositoryImpl();
const golfRateService = new GolfRateServiceImpl(
  golfRateRepository,
  AppDataSource
);
export const golfRateController = new GolfRateControllerImpl(golfRateService);
