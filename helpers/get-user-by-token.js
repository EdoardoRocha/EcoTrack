import jwt from "jsonwebtoken";

//Repository
import UserRepository from "../repository/UserRepository.js";
const userRepo = new UserRepository();

export const getUserByToken = async token => {

    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    const UserId = decoded.id;
    const user = await userRepo.findByPk(UserId);

    return user;

};