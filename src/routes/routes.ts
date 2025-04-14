import { Router } from "express";
import {
  customerController,
  golfRateController,
} from "./dependency_controller";

const router = Router();

// Customer routes
router.get("/customer", customerController.getCustomers);
router.get(
  "/customer/:id",

  customerController.getCustomerById
);
router.delete(
  "/customer/:id",

  customerController.deleteCustomer
);
router.post("/customer", customerController.createCustomer);
router.put("/customer/update/:id", customerController.updateCustomer);

// Golf rate routes
router.get("/golf-rate", golfRateController.getGolfRates);
router.get(
  "/golf-rate/nationality/:nationality",
  golfRateController.getGolfRatesByNationality
);
router.get("/golf-rate/:id", golfRateController.getGolfRateById);
router.post("/golf-rate", golfRateController.createGolfRate);
router.put("/golf-rate/update/:id", golfRateController.updateGolfRate);
router.delete("/golf-rate/:id", golfRateController.deleteGolfRate);

export default router;
