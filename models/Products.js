import { DataTypes } from "sequelize";
import conn from "../config/db.js";

const Product = conn.define('Products', {
    name: {
        type: DataTypes.STRING,
        require: true
    },
    category: {
        type: DataTypes.STRING,
        require: true
    },
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        require: true
    }
});

export default Product;