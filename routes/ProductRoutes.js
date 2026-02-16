import { Router } from "express";
import PetController from "../controller/ProductController.js";
const router = Router();

//Middleware
import { validateProduct } from "../middlewares/validateProduct.js";

router.get("/", PetController.showProducts);
router.post("/", validateProduct, PetController.addProducts);
router.delete("/:id", PetController.deleteProduct);

export default router;