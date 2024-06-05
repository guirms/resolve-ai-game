import express from 'express';
import cors from 'cors';
import { UserService } from './services/user.service.js';

const app = express();

const corsOptions = {
    origin: 'http://localhost:4200'
};

app.use(cors(corsOptions));

const port = 3000;
const userService = new UserService();

app.get('/', (_req, res) => {
    res.json(userService.login())
});

app.get('/test', (_req, res) => {
    res.json(userService.test())
});


app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});