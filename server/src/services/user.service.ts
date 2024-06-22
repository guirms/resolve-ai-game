import { prisma } from "../index.js";
import { LoginRequest, UserRequest } from "../interfaces/requests.js";
import jwt from 'jsonwebtoken';
import { LoginResponse, RankingResponse, UserResponse } from "../interfaces/responses.js";
import { ECountry } from "../interfaces/enums.js";

const JWT_SECRET = process.env.JWT_SECRET;

export class UserService {

    async saveUser(userRequest: UserRequest): Promise<number> {
        const existingUser = await prisma.users.findUnique({
            where: { Name: userRequest.name },
        });

        if (existingUser) {
            throw new Error('Já existe um usuário com esse nome');
        }

        const user = await prisma.users.create({
            data: {
                Name: userRequest.name,
                Password: userRequest.password,
                Country: userRequest.country,
                TotalPoints: 0
            }
        });

        return user.UserId;
    }

    async get(): Promise<UserResponse[]> {
        const users = await prisma.users.findMany();

        return users.map<UserResponse>(u => ({
            name: u.Name,
            password: u.Password,
            country: u.Country
        }));
    }

    async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        const user = await prisma.users.findFirstOrThrow({
            where: {
                Name: loginRequest.name,
                Password: loginRequest.password
            }
        });

        return { authToken: this.generateToken(user.UserId) };
    }

    async getRanking(currentPage: number): Promise<RankingResponse[]> {
        const pageSize = 20;
        const skip = (currentPage - 1) * pageSize;

        const ranking = await prisma.users.findMany({
            skip: skip,
            take: pageSize,
            orderBy: {
                TotalPoints: 'desc'
            },
            select: {
                Name: true,
                Country: true,
                TotalPoints: true
            }
        });

        if (!ranking || ranking.length === 0) {
            throw new Error('Página não encontrada');
        }

        const response: RankingResponse[] = ranking.map(user => ({
            name: user.Name,
            country: ECountry[user.Country],
            totalPoints: user.TotalPoints
        }));

        return response;
    }

    private generateToken(userId: number): string {
        const payload = { userId };

        return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
    }
}

