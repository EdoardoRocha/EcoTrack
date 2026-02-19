import { Router } from "express";
const router = Router();

// Controllers
import UserController from "../controller/UserController.js";

// Services
import UserService from "../service/UserService.js";

// Repositorys
import UserRepository from "../repository/UserRepository.js";

//Middlewares
import { validateNewUser, validateUser } from "../middlewares/validateUser.js";

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

router.post('/register', validateNewUser, (req, res) => userController.register(req, res));
router.post('/login', validateUser, (req, res) => userController.login(req, res));

export default router;