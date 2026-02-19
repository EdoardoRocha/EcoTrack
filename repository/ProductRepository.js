import Product from "../models/Products.js";

class ProductRepository {
    async findByPk(id) {
        return await Product.findByPk(id);
    };

    async findAll() {
        return await Product.findAll();
    };

    async create(data) {
        return await Product.create(data);
    };

    async destroy(id) {
        return await Product.destroy({ where: { id } });
    };

    async findOne(id) {
        return await Product.findOne({ where: { id } })
    };

    async findAllByPk(id) {
        return await Product.findAll(id);
    };

};

export default ProductRepository;