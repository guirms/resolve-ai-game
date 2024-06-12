import express from 'express';
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import userRoute from './routes/user.route.js';
import { UserService } from './services/user.service.js';

export const prisma = new PrismaClient();
const app = express();

const corsOptions = {
    origin: 'http://localhost:4200'
};

async function main() {
    app.use(cors(corsOptions));
    app.use(express.json());
    
    const port = 3000;

    app.get('/', (_req, res) => {
        res.json('OK')
    });

    app.use('/user', userRoute);

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