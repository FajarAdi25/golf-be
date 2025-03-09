import { Router } from "express";
import { customerController } from "./dependency_controller";

const router = Router();

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

export default router;
