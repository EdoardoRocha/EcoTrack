import Batche from "../models/Batches.js";
import Product from "../models/Products.js";

export default class BatcheController {

    constructor(batchService) {
        this.batchService = batchService;
    };

    async addBatche(req, res) {
        try {
            const batch = await this.batchService.createNewBatch(req);
            if (typeof batch == "string") {
                res.status(403).json({
                    message: batch
                })
            } else {
                res.status(201).json({
                    message: "Lote cadastrado com sucesso!",
                    batch
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getBatches(req, res) {
        try {
            const userId = req.user.id;
            const readyBatches = await this.batchService.getUpdatedBatch(userId)
            res.status(200).json(readyBatches);
            return;
        } catch (error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }

    async discardBatche(req, res) {
        try {
            const discardBatche = await this.batchService.discardBatch(req);
            res.status(201).json(discardBatche ? { message: discardBatche } : { message: "Lote descartado com sucesso!" });
            return;
        } catch (error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }

    async lossesBatches(req, res) {
        try {
            const userId = req.user.id;
            const losser = await this.batchService.losser(userId);
            res.status(200).json({ losser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}