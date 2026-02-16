import { Router } from "express";
import BatcheController from "../controller/BatcheController.js";
const router = Router();

//Middleware
import { validateBatche } from "../middlewares/validateBatche.js";

router.post("/", validateBatche, BatcheController.addBatche);
router.get("/inventory/status", BatcheController.getBatches);
router.patch("/:id/discard", BatcheController.discardBatche);
router.get("/reports/losses", BatcheController.lossesBatches);

export default router;