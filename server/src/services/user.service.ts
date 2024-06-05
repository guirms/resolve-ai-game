import { Test } from "../interfaces/responses.js";

export class UserService {
    login(): Test {
        const test: Test = {
            msg: 'All works fine'
        };
    
        return test;
    }

    test(): void {
        console.log('a');
    }
}

