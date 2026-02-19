import User from "../models/Users.js";

export default class UserRepository {
    async create(data) {
        return await User.create(data);
    };

    async find(id) {
        return await User.findOne(id);
    };

    async findByPk(id) {
        return await User.findByPk(id);
    }
};