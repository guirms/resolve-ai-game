import { prisma } from "../index.js";
import { LoginRequest, UserRequest } from "../interfaces/requests.js";
import jwt from 'jsonwebtoken';
import { LoginResponse, UserResponse } from "../interfaces/responses.js";

const JWT_SECRET = process.env.JWT_SECRET;

export class UserService {

    async saveUser(userRequest: UserRequest): Promise<number> {
        const existingUser = await prisma.users.findUnique({
            where: { Name: userRequest.name },
        });

        if (existingUser) {
            throw new Error('User with this name already exists');
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

    private generateToken(userId: number): string {
        const payload = { userId };

        return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
    }
}

