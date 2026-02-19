import { Router } from "express";
const router = Router();

//Repositorys
import BatchRepository from "../repository/BatchRepository.js";
import ProductRepository from "../repository/ProductRepository.js";

//Services
import BatchService from "../service/BatchService.js";

//Controllers
import BatcheController from "../controller/BatcheController.js";

const prodRepo = new ProductRepository();

//
const batchRepo = new BatchRepository();
const batchService = new BatchService(batchRepo, prodRepo);
const batchController = new BatcheController(batchService);

//Middlewares
import { validateBatche } from "../middlewares/validateBatche.js";
import checkToken from "../middlewares/verifyToken.js";

router.post("/", checkToken, validateBatche, (req, res) => batchController.addBatche(req, res));
router.get("/inventory/status", checkToken, (req, res) => batchController.getBatches(req, res));
router.patch("/:id/discard", checkToken, (req, res) => batchController.discardBatche(req, res));
router.get("/reports/losses", checkToken, (req, res) => batchController.lossesBatches(req, res));

export default router;