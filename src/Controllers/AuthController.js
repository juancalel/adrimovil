import { UserModel } from "../Models/UserModel.js";
import { TokenService } from "../Service/TokenService.js";

export class AuthController {
    static async login(req, res) {
        const data = req.body;

        const { email, password } = data;


        const user = await UserModel.validateUser({ email, password });


        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = TokenService.generateToken({ id: user.id_usuario, email: user.email });

        res.status(200).json({ name: user.name, email: user.email, token });
    }

    static async register(req, res) {
        const data = req.body;

        const { email } = data;

        const user = await UserModel.userExists({ email })
        if (user) return res.status(400).json({ message: 'User already exists' })

        const userWasCreated = await UserModel.create({ input: data })
        if (userWasCreated.success) {
            res.status(201).json(userWasCreated.data)
        } else {
            res.status(400).json({ message: userWasCreated.message })
        }

    }
}