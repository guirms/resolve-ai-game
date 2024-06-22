export interface LoginResponse {
    authToken: string;
}

export interface SaveUserResponse {
    userId: number;
}

export interface DailyChallengeResponse {
    dailyChallengeId: number;
    number: number, 
    hints: string[], 
}


export interface RankingResponse {
    name: string, 
    country: string,
    totalPoints: number
}