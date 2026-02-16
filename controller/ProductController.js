import Product from "../models/Products.js";
import Batche from "../models/Batches.js";
export default class ProductController {
    static async showProducts(req, res) {

        try {
            const products = await Product.findAll();

            //Calculating price and adding the currency
            const price = products.map(product => Number(product.unit_price));
            const calculatedPrice = price.reduce((acumulator, acctualyValue) => acumulator + acctualyValue, 0);
            const totalPrice = calculatedPrice.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            res.status(200).json({
                products,
                totalPrice
            });
        } catch (error) {
            res.status(500).json({ message: error })
        }

    }

    static async addProducts(req, res) {
        const {
            name,
            category,
            unit_price
        } = req.body;

        //Saving in db
        try {
            const product = {
                name,
                category,
                unit_price
            }
            await Product.create(product);

            res.status(201).json({
                message: "Produto cadastrado com sucesso!",
                product
            })
        } catch (error) {
            res.status(500).json({ message: error })
        }

    }

    static async deleteProduct(req, res) {
        const id = req.params.id;

        try {
            //Validade if not exists
            const product = await Product.findOne({ where: { id } });
            if (!product) {
                res.status(422).json({ message: "O produto não existe!" })
                return;
            }
        } catch (error) {
            res.status(500).json({ message: error });
        }

        try {
            //Remove all batches associates the Product ID
            await Batche.destroy({ where: { ProductId: id } });

            //After the program excludes the Product
            await Product.destroy({ where: { id } });

            res.status(200).json({ message: "Produto e lotes removidos com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: error });
        }

    }
}
