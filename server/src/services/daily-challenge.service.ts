import { prisma } from "../index.js";
import { ProgressRequest } from "../interfaces/requests.js";
import { DailyChallengeDto, UserChallengeResponse } from "../interfaces/responses.js";

export class DailyChallengeService {

    async get(userId: number): Promise<UserChallengeResponse> {
        const user = await prisma.users.findUnique({
            where: { UserId: userId },
            select: { RemainingAttemptsPerNumber: true, RemainingHintsPerNumber: true, TotalRemainingHints: true, LastDailyChallengeId: true }
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const lastDailyChallenge = user.LastDailyChallengeId ?? 0;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0);

        const dailyChallenge = await prisma.daily_challenge.findMany({
            where: { Date: currentDate, DailyChallengeId: { gt: lastDailyChallenge } },
            include: {
                hints: {
                    select: { Name: true }
                }
            }
        });

        if (!dailyChallenge) {
            throw new Error('Você já realizou o desafio hoje. Tente novamente amanhã');
        }

        const dailyChallenges: DailyChallengeDto[] = dailyChallenge.map(challenge => ({
            dailyChallengeId: challenge.DailyChallengeId,
            number: challenge.Number,
            hints: challenge.hints.map(hint => hint.Name)
        }));

        return {
            remainingAttemptsPerNumber: user.RemainingAttemptsPerNumber,
            remainingHintsPerNumber: user.RemainingHintsPerNumber,
            totalRemainingHints: user.TotalRemainingHints,
            dailyChallenges: dailyChallenges
        };
    }

    async saveProgress(progressRequest: ProgressRequest, userId: number): Promise<void> {
        await prisma.users.update({
            where: { UserId: userId },
            data: {
                TotalPoints: {
                    increment: progressRequest.pointsToAdd
                },
                RemainingAttemptsPerNumber: progressRequest.remainingAttemptsPerNumber,
                RemainingHintsPerNumber: progressRequest.remainingHintsPerNumber,
                TotalRemainingHints: progressRequest.totalRemainingHints,
                LastDailyChallengeId: progressRequest.lastDailyChallengeId
            }
        });
    }
}