import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { LoginRequest } from '../../../components/data-types/requests';
import { LoginResponse, RankingResponse, SaveUserResponse } from '../../../components/data-types/responses';
import { AuthToken } from '../../../../assets/constants/storage-key';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers = this.headers.append('Authorization', `Bearer ${localStorage.getItem(AuthToken)}`);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.baseUrl + 'user/login', loginRequest);
  }

  save(loginRequest: LoginRequest): Observable<SaveUserResponse> {
    return this.http.post<SaveUserResponse>(environment.baseUrl + 'user/save', loginRequest);
  }

  getRanking(currentPage: number): Observable<RankingResponse[]> {
    return this.http.get<RankingResponse[]>(environment.baseUrl + `user/getRanking/${currentPage}`, { headers: this.headers });
  }
}
