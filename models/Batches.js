import { DataTypes } from "sequelize";
import conn from "../config/db.js";

//Products
import Product from "./Products.js";

const Batche = conn.define('Batches', {
    quantity: {
        type: DataTypes.INTEGER,
        require: true
    },
    expiry_date: {
        type: DataTypes.DATE,
        require: true,
    },
    status: {
        type: DataTypes.ENUM('Ok', 'Descartado', 'Vendido', 'Critico', 'Alerta'),
        defaultValue: 'Ok'
    }
})

Batche.belongsTo(Product);
Product.hasMany(Batche);

export default Batche;