import { ECountry } from "./enums.js";

export interface UserRequest {
    name: string,
    password: string,
    country: ECountry
}

export interface LoginRequest {
    name: string,
    password: string,
    country: ECountry
}

export interface ProgressRequest {
    pointsToAdd: number;
    remainingAttemptsPerNumber: number;
    remainingHintsPerNumber: number;
    totalRemainingHints: number;
    lastDailyChallengeId: number;
}

