import { prisma } from "../index.js";
import { ProgressRequest } from "../interfaces/requests.js";
import { DailyChallengeDto, HintDto, UserChallengeResponse } from "../interfaces/responses.js";

export class DailyChallengeService {

    async get(userId: number): Promise<UserChallengeResponse> {
        const user = await prisma.users.findUnique({
            where: { UserId: userId },
            select: { RemainingAttemptsPerNumber: true, RemainingHintsPerNumber: true, TotalRemainingHints: true, LastHintId: true, HastFinished: true }
        });

        if (!user) {
            throw new Error('Nenhum usuário encontrado');
        }

        if (user.HastFinished || user.RemainingAttemptsPerNumber === 0) {
            throw new Error('Você já realizou o desafio hoje. Tente novamente amanhã!');
        }

        const currentDate = new Date().toISOString().split('T')[0];

        const dailyChallenge = await prisma.daily_challenge.findMany({
            where: {
                Date: {
                    gte: new Date(`${currentDate}T00:00:00.000Z`),
                    lt: new Date(`${currentDate}T23:59:59.999Z`)
                }
            },
            include: {
                hints: {
                    select: { HintId: true, Name: true }
                }
            }
        });

        if (!dailyChallenge || dailyChallenge.length === 0) {
            throw new Error('Erro ao buscar desafio diário');
        }

        if (user.LastHintId) {
            for (let i = 0; i < dailyChallenge.length; i++) {
                if (dailyChallenge[i].hints && dailyChallenge[i].hints.length > 0) {
                    for (let j = 0; j < dailyChallenge[i].hints.length; j++) {
                        if (dailyChallenge[i].hints[j].HintId < user.LastHintId) {
                            dailyChallenge[i].hints.splice(j, 1);
                            j--;
                        }
                    }
                }
            }
        }
        
        
        const dailyChallenges: DailyChallengeDto[] = dailyChallenge.map(c => ({
            dailyChallengeId: c.DailyChallengeId,
            number: c.Number,
            hints: c.hints.map(h => ({
                hintId: h.HintId,
                name: h.Name
            }))
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
                LastHintId: progressRequest.lastHintId,
                HastFinished: progressRequest.hasFinished
            }
        });
    }
}