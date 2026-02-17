import Product from "../models/Products.js";
import Batche from "../models/Batches.js";

export default class ProductController {

    constructor(productService) {
        this.productService = productService;
    };

    async showProducts(req, res) {

        try {
            const data = await this.productService.showAllProducts();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error })
        }

    }

    async addProducts(req, res) {
        //Saving in db
        try {
            const product = await this.productService.createProduct(req.body);
            res.status(201).json({
                message: "Produto cadastrado com sucesso!",
                product
            })
        } catch (error) {
            res.status(500).json({ message: error })
        }

    }

    async deleteProduct(req, res) {
        try {
            await this.productService.deleteProduct(req.params);
            res.status(200).json({ message: "Produto e lotes removidos com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    }
}
