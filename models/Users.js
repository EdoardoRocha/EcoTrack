import { DataTypes } from "sequelize";
import conn from "../config/db.js";

const User = conn.define('Users', {
    name: {
        type: DataTypes.STRING,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        require: true
    }
});

export default User;