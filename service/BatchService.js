class BatchService {
    constructor(batchRepository, productRepository) {
        this.batchRepository = batchRepository;
        this.productRepository = productRepository;
    };

    async createNewBatch(data) {
        const batch = {
            quantity: data.quantity,
            expiry_date: data.expiry_date,
            status: data.status,
            ProductId: data.ProductId
        }
        return await this.batchRepository.create(batch);
    };

    async getUpdatedBatch() {
        //Get the Batches
        const batches = await this.batchRepository.findAll();

        //Get today date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        //Calculating date differences
        //It will only move forward when all promises have been fulfilled.
        const readyBatches = await Promise.all(batches.map(async batche => {
            //Check if the batche he has discart = true;
            if (batche.status == "Descartado") return null;
            const batcheDate = new Date(batche.expiry_date);
            batcheDate.setHours(0, 0, 0, 0);

            const diffInMs = batcheDate - today;
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;

            let newStatus = batche.status;

            //Apply business logic
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
                await this.batchRepository.update({ status: newStatus }, { where: { id: batche.id } });
                batche.status = newStatus;
            };
            return batche;
        }));


        return readyBatches.filter(batche => batche !== null);
    };

    async discardBatch(data) {
        const id = data.id;

        const batche = await this.batchRepository.findByPk(id);

        //Check if exists batche
        if (!batche) {
            const message = "Lote não encontrado!";
            return message;
        };

        const selector = {
            where: {
                id
            }
        }
        const values = {
            status: "Descartado"
        }
        await this.batchRepository.update(values, selector);
    };

    async losser() {
        const batches = await this.batchRepository.findAll();
        let batcheLosser = 0;

        for (let i of batches) {
            if (i.status == "Descartado") {
                const product = await this.productRepository.findByPk(i.ProductId);
                const quantity = i.quantity;
                const unitPrice = product.unit_price;
                batcheLosser += quantity * unitPrice;
            };
        };

        if (batcheLosser == 0) {
            const message = "Não houve prejuízo!";
            return message;
        }
        const losser = batcheLosser.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        return losser;
    }
};


export default BatchService;