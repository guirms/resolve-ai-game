import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ERoutePath } from '../../components/data-types/enums';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  ngUnsubscribe: Subject<void> = new Subject<void>();
  
  constructor(private router: Router) { }

  navigateByUrl(routePath: ERoutePath): void {
    this.router.navigate([ERoutePath[routePath]]);
  }

  logout(): void {
    localStorage.clear();
    this.navigateByUrl(ERoutePath.login);
  }
}
