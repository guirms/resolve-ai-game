export interface LoginRequest {
    name: string;
    password: string;
}

export interface SaveUserRequest { 
    name: string, 
    password: string, 
    country: number
}