import { prisma } from "../index.js";
import {ProgressRequest } from "../interfaces/requests.js";
import { DailyChallengeResponse, UserResponse } from "../interfaces/responses.js";

export class DailyChallengeService {

    async get(userId: number): Promise<DailyChallengeResponse[]> {
        const user = await prisma.users.findUnique({
            where: { UserId: userId },
            select: { LastDailyChallengeId: true }
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const lastDailyChallenge = user.LastDailyChallengeId ?? 0;

        const dailyChallenge = await prisma.daily_challenge.findMany({
            where: { DailyChallengeId: { gt: lastDailyChallenge } },
            include: {
                hints: {
                    select: { Name: true }
                }
            }
        });

        if (!user) {
            throw new Error('Você já realizou o desafio hoje. Tente novamente amanhã');
        }

        const response: DailyChallengeResponse[] = dailyChallenge.map(challenge => ({
            dailyChallengeId: challenge.DailyChallengeId,
            number: challenge.Number,
            hints: challenge.hints.map(hint => hint.Name)
        }));

        return response;
    }

    async saveProgress(progressRequest: ProgressRequest, userId: number): Promise<void> {
        await prisma.users.update({
            where: { UserId: userId },
            data: {
                TotalPoints: {
                    increment: progressRequest.pointsToAdd
                },
                LastDailyChallengeId: progressRequest.lastDailyChallengeId
            }
        });
    }    
}

