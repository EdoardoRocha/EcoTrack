import { Router } from "express";
const router = Router();

//Controllers
import ProductController from "../controller/ProductController.js";

//Services
import ProductService from "../service/ProductService.js";

//Repositorys
import ProductRepository from "../repository/ProductRepository.js";
import BatchRepository from "../repository/BatchRepository.js";

const prodRepo = new ProductRepository();
const batchRepo = new BatchRepository();
const prodService = new ProductService(prodRepo, batchRepo);
const prodController = new ProductController(prodService);

//Middleware
import { validateProduct, existProduct } from "../middlewares/validateProduct.js";

router.get("/", (req, res) => prodController.showProducts(req, res));
router.post("/", validateProduct, (req, res) => prodController.addProducts(req, res));
router.delete("/:id", existProduct, (req, res) => prodController.deleteProduct(req, res));

export default router;