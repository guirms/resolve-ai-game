export interface LoginResponse {
    authToken: string;
}

export interface SaveUserResponse {
    userId: number;
}

export interface UserChallengeResponse {
    remainingAttemptsPerNumber: number;
    remainingHintsPerNumber: number;
    totalRemainingHints: number;
    dailyChallenges: DailyChallengeDto[];
}

export interface DailyChallengeDto {
    dailyChallengeId: number;
    number: number, 
    hints: string[], 
}

export interface RankingResponse {
    name: string, 
    country: string,
    totalPoints: number
}