//Repository
import UserRepository from "../repository/UserRepository.js";
const userRepo = new UserRepository();

import bcrypt from "bcryptjs";

const validateNewUser = async (req, res, next) => {
    const { name, email, password, confirmpassword } = req.body;

    //Validators
    if (!name) {
        res.status(400).json({ message: "O Nome é obrigatório!" });
        return;
    };
    if (!email) {
        res.status(400).json({ message: "O E-mail é obrigatório!" });
        return;
    };
    if (!password) {
        res.status(400).json({ message: "A Senha é obrigatória!" });
        return;
    };

    if (!confirmpassword) {
        res.status(400).json({ message: "A Confirmação de senha é obrigatória!" });
        return;
    }

    if (password !== confirmpassword) {
        res.status(422).json({ message: "As Senhas não são iguais!" });
        return
    };

    //Check user if exists
    const userExists = await userRepo.find({ where: { email } });
    if (userExists) {
        res.status(422).json({ message: "O Usuário já existe!" });
        return;
    };

    next();

};


const validateUser = async (req, res, next) => {
    const { email, password } = req.body;

    //Basic Validator
    if (!email) {
        res.status(400).json({ message: "O E-mail é obrigatório!" });
        return;
    };

    if (!password) {
        res.status(400).json({ message: "A Senha é obrigatória!" });
        return;
    };

    //Check if user exists
    const user = await userRepo.find({ where: { email } });
    if (!user) {
        res.status(404).json({message: "Não há usuários cadastrados com esse E-mail!"});
        return;
    };

    //Check if password match db password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        res.status(422).json({ message: "Senha inválida!" });
        return;
    }

    next();
};

export { validateNewUser, validateUser };