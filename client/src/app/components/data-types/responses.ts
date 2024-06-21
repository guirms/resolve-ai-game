export interface LoginResponse {
    authToken: string;
}

export interface SaveUserResponse {
    userId: number;
}

export interface DailyChallengeResponse {
    number: number, 
    hints: string[], 
}