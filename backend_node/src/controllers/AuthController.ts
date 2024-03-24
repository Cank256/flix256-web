const AuthService = require('../services/AuthService');

class AuthControllerClass {
    static async signup(req: any, res: any) {
        try {
            const user = await AuthService.signup(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async login(req: any, res: any) {
        try {
            const user = await AuthService.login(req.body);
            res.status(200).json({ user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = AuthControllerClass;