import { Router } from "express";
import { UserService } from "../services/user.service.js";
import { Test } from "../interfaces/responses.js";
import { LoginRequest, UserRequest } from "../interfaces/requests.js";

const router = Router();

const userService = new UserService();

router.post('/save', async (req, res) => {
    try {
        const userRequest: UserRequest = req.body;        

        const userId = await userService.saveUser(userRequest);

        res.status(201).json({ 'userId': userId });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.get('/get', async (_req, res) => {
    try {
        res.status(200).json((await userService.get()));
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const loginRequest: LoginRequest = req.body;        

        res.status(200).json((await userService.login(loginRequest)));
    } catch (error) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos' });
    }
});

export default router;
