import { ECountry } from "./enums.js";

export interface UserDto {
    name: string, 
    password: string, 
    country: ECountry
}