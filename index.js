import 'dotenv/config';
import express from "express";
import cors from "cors";

//Import db config
import conn from "./config/db.js";

//Import Models
import Batche from "./models/Batches.js";
import Product from "./models/Products.js";

const app = express();

//Config JSON response
app.use(express.json());

//Solve CORS
app.use(cors());

//Routes
import ProductsRoutes from "./routes/ProductRoutes.js";
import BatcheRouter from "./routes/BatcheRoutes.js";

app.use("/products", ProductsRoutes);
app.use("/batches", BatcheRouter);

conn
    .sync()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Servidor ligado na porta ${process.env.PORT}`)
        })
    })
    .catch(err => console.error(err))