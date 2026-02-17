class ProductService {
    constructor(productRepository, batchRepository) {
        this.productRepository = productRepository;
        this.batchRepository = batchRepository;
    };

    async showAllProducts() {
        const products = await this.productRepository.findAll();

        const plainProducts = products.map(product => product.get({ plain: true }));

        //Calculating price and adding the currency
        const price = plainProducts.map(product => Number(product.unit_price));
        const calculatedPrice = price.reduce((acumulator, acctualyValue) => acumulator + acctualyValue, 0);
        const totalPrice = calculatedPrice.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        const data = {
            products: plainProducts,
            totalPrice
        }

        return data;
    };

    async createProduct(data) {
        const name = data.name;
        const category = data.category;
        const unit_price = data.unit_price;

        const products = {
            name,
            category,
            unit_price
        }

        const product = await this.productRepository.create(products);

        return product;
    };

    async deleteProduct(data) {
        const id = data.id;
        
        //Remove all batches associates the Product ID
        await this.batchRepository.destroy(id);

        //After the program excludes the Product
        await this.productRepository.destroy(id);
    }
};

export default ProductService;