import { ECountry } from "./enums.js";

export interface Test {
    msg: string;
}

export interface UserResponse {
    name: string, 
    password: string, 
    country: ECountry
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
    hints: HintDto[], 
}

export interface HintDto {
    hintId: number;
    name: string;
}

export interface LoginResponse {
    authToken: string;
}

export interface RankingResponse {
    name: string, 
    country: string,
    totalPoints: number
}