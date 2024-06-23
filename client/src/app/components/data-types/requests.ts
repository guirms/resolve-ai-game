export interface LoginRequest {
    name: string;
    password: string;
}

export interface SaveUserRequest { 
    name: string, 
    password: string, 
    country: number
}

export interface ProgressRequest {
    pointsToAdd: number;
    remainingAttemptsPerNumber: number;
    remainingHintsPerNumber: number;
    totalRemainingHints: number;
    lastHintId: number;
    hasFinished: boolean;
}