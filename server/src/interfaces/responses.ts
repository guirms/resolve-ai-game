import { ECountry } from "./enums.js";

export interface Test {
    msg: string;
}

export interface UserResponse {
    name: string, 
    password: string, 
    country: ECountry
}

export interface DailyChallengeResponse {
    number: number, 
    hints: string[], 
}

export interface LoginResponse {
    authToken: string;
}

export interface RankingResponse {
    name: string, 
    country: ECountry,
    totalPoints: number
}