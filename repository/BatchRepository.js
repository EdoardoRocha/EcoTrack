import Batche from "../models/Batches.js";
import Product from "../models/Products.js";

class BatchRepository {
    async create(data) {
        return await Batche.create(data);
    };

    async findAll() {
        return await Batche.findAll();
    };

    async update(data, options) {
        return await Batche.update(data, options);
    };

    async findByPk(data) {
        return await Batche.findByPk(data);
    };

    async destroy(id) {
        return await Batche.destroy({ where: { ProductId: id } });
    };

    async findAllByUser(userId) {
        return await Batche.findAll({
            include: [{
                model: Product,
                where: { UserId: userId },
                attributes: []
            }]
        })
    }
};

export default BatchRepository;