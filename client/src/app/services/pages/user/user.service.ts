import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { LoginRequest } from '../../../components/data-types/requests';
import { LoginResponse, SaveUserResponse } from '../../../components/data-types/responses';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.baseUrl + 'user/login', loginRequest);
  }

  save(loginRequest: LoginRequest): Observable<SaveUserResponse> {
    return this.http.post<SaveUserResponse>(environment.baseUrl + 'user/save', loginRequest);
  }
}
