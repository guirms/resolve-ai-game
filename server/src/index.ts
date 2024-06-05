import express from 'express';
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import { UserService } from './services/user.service.js';

export const prisma = new PrismaClient();
const app = express();

const corsOptions = {
    origin: 'http://localhost:4200'
};

async function main() {
    app.use(cors(corsOptions));

    const port = 3000;
    const userService = new UserService();

    app.get('/', (_req, res) => {
        res.json(userService.login())
    });

    app.get('/test', async (_req, res) => {
        try {
            res.status(200).json(await userService.test());
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });

    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });
}


main()
    .then(async () => {
        await prisma.$connect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });