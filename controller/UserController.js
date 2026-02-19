export default class UserController {
    constructor(userService) {
        this.userService = userService;
    };

    async register(req, res) {
        try {
            const userDataRegister = await this.userService.registerUser(req.body);
            res.status(201).json({
                message: "Usuário criado com sucesso!",
                userDataRegister
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        };
    };

    async login(req, res) {
        try {
            const userDataLogin = await this.userService.loginUser(req.body);
            res.status(201).json({
                message: "Usuário autênticado com sucesso!",
                userDataLogin
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};