import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthToken } from '../../../../assets/constants/storage-key';
import { DailyChallengeResponse } from '../../../components/data-types/responses';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private headers = new HttpHeaders();

  constructor(private http: HttpClient) { 
    this.headers = this.headers.append('Authorization', `Bearer ${localStorage.getItem(AuthToken)}`);
  }
  
  getChallenge(): Observable<DailyChallengeResponse[]> {
    return this.http.get<DailyChallengeResponse[]>(environment.baseUrl + 'dailyChallenge/get', { headers: this.headers });
  }
}
