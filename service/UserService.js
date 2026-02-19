import bcrypt from "bcryptjs";
import { createUserToken } from "../helpers/create-user-token.js";

export default class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    };

    async registerUser(data) {
        const name = data.name;
        const email = data.email;
        const password = data.password;


        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = {
            name,
            email,
            password: passwordHash
        };

        const userCreate = await this.userRepository.create(user);
        const userToken = await createUserToken(userCreate);
        return { userToken, UserId: userCreate.id }
    };

    async loginUser(data) {
        const email = data.email;
        const password = data.password;


        //Find real user on database
        const userFromDB = await this.userRepository.find({ where: { email } });


        const user = {
            email,
            password
        };
        const userToken = await createUserToken(userFromDB);
        return userToken;
    }
}