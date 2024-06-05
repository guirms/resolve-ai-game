import { prisma } from "../index.js";
import { Test } from "../interfaces/responses.js";

export class UserService {
    login(): Test {
        const test: Test = {
            msg: 'All works fine'
        };

        return test;
    }

    async test(): Promise<any> {
        return await prisma.users.findMany()
    }
}

