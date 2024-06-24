import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthToken } from '../../../../assets/constants/storage-key';
import { UserChallengeResponse } from '../../../components/data-types/responses';
import { environment } from '../../../../environments/environment.development';
import { ProgressRequest } from '../../../components/data-types/requests';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private headers = new HttpHeaders();

  constructor(private http: HttpClient) { 
    this.headers = this.headers.append('Authorization', `Bearer ${localStorage.getItem(AuthToken)}`);
  }
  
  getChallenge(getNextDay: boolean): Observable<UserChallengeResponse> {
    return this.http.get<UserChallengeResponse>(environment.baseUrl + `dailyChallenge/get/${getNextDay}`, { headers: this.headers });
  }

  saveProgress(progressRequest: ProgressRequest): Observable<void> {
    return this.http.patch<void>(environment.baseUrl + 'dailyChallenge/saveProgress', progressRequest, { headers: this.headers });
  }
}
