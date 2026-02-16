import { Router } from "express";
import  PetController  from "../controller/ProductController.js";
const router = Router();

router.get("/", PetController.showProducts);
router.post("/", PetController.addProducts);
router.delete("/:id", PetController.deleteProduct);

export default router;