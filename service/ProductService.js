import { getToken } from "../helpers/get-token.js";
import { getUserByToken } from "../helpers/get-user-by-token.js";

class ProductService {
    constructor(productRepository, batchRepository, userRepository) {
        this.productRepository = productRepository;
        this.batchRepository = batchRepository;
        this.userRepository = userRepository;
    };

    async showAllProducts(data) {

        //Get the Token
        const token = getToken(data);

        //Get User by Token
        const user = await getUserByToken(token)

        //Get Products on User
        const products = await this.productRepository.findAllByPk({ where: { UserId: user.id } });

        const plainProducts = products.map(product => product.get({ plain: true }));

        //Calculating price and adding the currency
        const price = plainProducts.map(product => Number(product.unit_price));
        const calculatedPrice = price.reduce((acumulator, acctualyValue) => acumulator + acctualyValue, 0);
        const totalPrice = calculatedPrice.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        const productsInfo = {
            products: plainProducts,
            totalPrice
        }

        return productsInfo;
    };

    async createProduct(data) {
        const name = data.body.name;
        const category = data.body.category;
        const unit_price = data.body.unit_price;


        //Get Owner Product
        const token = getToken(data);
        const user = await getUserByToken(token);

        const products = {
            name,
            category,
            unit_price,
            UserId: user.id
        }

        const product = await this.productRepository.create(products);

        return product;
    };

    async deleteProduct(data) {
        const id = data.params.id;

        //Get the Token
        const token = getToken(data);

        //Get User by Token
        const user = await getUserByToken(token)

        const productFromDB = await this.productRepository.findByPk(id);

        if (user.id !== productFromDB.UserId) {
            return "Esse produto não pertence a você.";
        }

        await this.batchRepository.destroy(id);
        await this.productRepository.destroy(id);

        return null; 
    }
};

export default ProductService;