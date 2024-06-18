import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthToken } from '../../../../assets/constants/storage-key';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private headers!: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers = this.headers.append('Authorization', `Bearer ${localStorage.getItem(AuthToken)}`);

  }
  

  test(): Observable<any> {
    return this.http.get<any>('http://localhost:3000', { headers: this.headers });
  }
}
