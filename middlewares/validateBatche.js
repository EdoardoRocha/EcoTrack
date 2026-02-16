import Product from "../models/Products.js";

export const validateBatche = async (req, res, next) => {
    const {
        quantity,
        expiry_date,
        status,
        ProductId
    } = req.body;

    //Validators
    if (!quantity) {
        res.status(400).json({ message: "A quantidade é obrigatória!" });
        return;
    };
    if (isNaN(quantity) || typeof quantity !== 'number') {
        res.status(400).json({ message: "Formato de quantidade não aceito, por favor envie um número válido!" })
        return;
    };
    //Validator for invalids quantity. Business rules.
    if (quantity <= 0) {
        res.status(422).json({ message: "Quantidade inválida, é necessário que tenha um valor para registrar o Lote." })
        return;
    };
    if (!expiry_date) {
        res.status(400).json({ message: "A validade é obrigatória!" });
        return;
    };
    if (!status) {
        res.status(400).json({ message: "O Status é obrigatória!" });
        return;
    };
    if (!ProductId) {
        res.status(400).json({ message: "O Id do produto é obrigatório!" });
        return;
    };
    if (isNaN(ProductId) || typeof ProductId !== 'number') {
        res.status(400).json({ message: "Formato de preço não aceito, por favor envie um número!" })
        return;
    };

    //Date validators
    if (typeof expiry_date !== "string") {
        res.status(400).json({ message: "A data de validade deve ser uma string no formato YYYY-MM-DD!" });
        return;
    };

    //Format validator with RegEx
    const regexDate = /^\d{4}-\d{2}-\d{2}$/;
    if (!regexDate.test(expiry_date)) {
        res.status(422).json({ message: "Formato de data inválido. Use o padrão internacional: YYYY-MM-DD!" });
        return;
    };

    //Validator if Date is real
    const date = new Date(expiry_date);
    if (isNaN(date.getTime())) {
        res.status(422).json({ message: "A data fornecida não é uma data real." });
    }

    //Check if exists product
    const product = await Product.findOne({ where: ProductId });
    if (!product) {
        res.status(422).json({ message: "Produto não cadastrado!" });
        return;
    }


    next();
};