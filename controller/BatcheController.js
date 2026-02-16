import Batche from "../models/Batches.js";
import Product from "../models/Products.js";

export default class BatcheController {
    static async addBatche(req, res) {
        const {
            quantity,
            expiry_date,
            status,
            ProductId
        } = req.body;

        //Validators
        if (!quantity) {
            res.status(422).json({ message: "A quantidade é obrigatória!" });
            return;
        };
        if (isNaN(quantity) || typeof quantity !== 'number') {
            res.status(422).json({ message: "Formato de quantidade não aceito, por favor envie um número!" })
            return;
        };
        if (!expiry_date) {
            res.status(422).json({ message: "A validade é obrigatória!" });
            return;
        };
        if (!status) {
            res.status(422).json({ message: "O Status é obrigatória!" });
            return;
        };
        if (!ProductId) {
            res.status(422).json({ message: "O Id do produto é obrigatório!" });
            return;
        };
        if (isNaN(ProductId) || typeof ProductId !== 'number') {
            res.status(422).json({ message: "Formato de preço não aceito, por favor envie um número!" })
            return;
        };

        try {
            //Check if exists product
            const product = await Product.findOne({ where: ProductId });
            if (!product) {
                res.status(404).json({ message: "Produto não cadastrado!" });
                return;
            }

            const batche = {
                quantity,
                expiry_date,
                status,
                ProductId
            }

            await Batche.create(batche);
            res.status(201).json({
                message: "Lote cadastrado com sucesso!",
                batche
            })

        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async getBatches(req, res) {
        try {
            //Get the Batches
            const batches = await Batche.findAll();

            //Get today date
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            //Calculating date differences
            //It will only move forward when all promises have been fulfilled.
            const readyBatches = await Promise.all(batches.map(async batche => {
                //Check if the batche he has discart = true;
                if (batche.status == "Descartado") return;
                const batcheDate = new Date(batche.expiry_date);
                batcheDate.setHours(0, 0, 0, 0);

                const diffInMs = batcheDate - today;
                const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;

                let newStatus = batche.status;

                //Apply business rules
                switch (true) {
                    case (diffInDays < 0):
                        newStatus = "Critico";
                        break;
                    case (diffInDays >= 0 && diffInDays <= 7):
                        newStatus = "Alerta";
                        break;
                    default:
                        newStatus = "Ok";
                };

                if (batche.status !== newStatus) {
                    await batche.update({ status: newStatus });
                }
                return batche;
            }));

            res.status(200).json(readyBatches);
            return;
        } catch (error) {
            res.status(500).json({ message: error });
            return;
        }
    }

    static async discardBatche(req, res) {
        const id = req.params.id;

        try {
            const batche = await Batche.findByPk(id);

            //Check if exists batche
            if (!batche) {
                res.status(404).json({ message: "Lote não encontrado!" });
                return;
            };

            await Batche.update({ status: "Descartado" }, { where: { id } });
            res.status(201).json({ message: "Lote descartado com sucesso!" });
            return;
        } catch (error) {
            res.status(500).json({ message: error });
            return;
        }
    }

    static async lossesBatches(req, res) {
        try {
            const batches = await Batche.findAll();
            let batcheLosser = 0;

            for (let i of batches) {
                if (i.status == "Descartado") {
                    const product = await Product.findByPk(i.ProductId);
                    const quantity = i.quantity;
                    const unitPrice = product.unit_price;
                    batcheLosser += quantity * unitPrice;
                };
            };

            if (batcheLosser == 0) {
                res.status(200).json({
                    message: "Não houve prejuízo!"
                })
                return;
            } else {
                const losser = batcheLosser.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                res.status(200).json({ losser });
            }
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}