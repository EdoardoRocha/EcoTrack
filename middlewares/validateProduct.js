export const validateProduct = async (req, res, next) => {
    const {
        name,
        category,
        unit_price
    } = req.body;

    //Validators
    if (!name) {
        res.status(400).json({ message: "O nome é obrigatório!" })
        return;
    }
    if (!category) {
        res.status(400).json({ message: "A categoria é obrigatória!" })
        return;
    }
    if (!unit_price) {
        res.status(400).json({ message: "O preço da unidade é obrigatório!" })
        return;
    }
    if (isNaN(unit_price) || typeof unit_price !== 'number') {
        res.status(400).json({ message: "Formato de preço não aceito, por favor envie um número!" })
        return;
    };
    if (unit_price <= 0) {
        res.status(422).json({ message: "Formato de preço não aceito, por favor envie um valor válido!" })
        return;
    };

    next();
}