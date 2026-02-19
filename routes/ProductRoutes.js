import { Router } from "express";
const router = Router();

//Controllers
import ProductController from "../controller/ProductController.js";

//Services
import ProductService from "../service/ProductService.js";

//Repositorys
import ProductRepository from "../repository/ProductRepository.js";
import BatchRepository from "../repository/BatchRepository.js";
import UserRepository from "../repository/UserRepository.js";

const prodRepo = new ProductRepository();
const batchRepo = new BatchRepository();
const userRepo = new UserRepository();
const prodService = new ProductService(prodRepo, batchRepo, userRepo);
const prodController = new ProductController(prodService);

//Middlewares
import { validateProduct, existProduct } from "../middlewares/validateProduct.js";
import checkToken from "../middlewares/verifyToken.js";

router.get("/", checkToken, (req, res) => prodController.showProducts(req, res));
router.post("/", checkToken, validateProduct, (req, res) => prodController.addProducts(req, res));
router.delete("/:id", checkToken, existProduct, (req, res) => prodController.deleteProduct(req, res));

export default router;