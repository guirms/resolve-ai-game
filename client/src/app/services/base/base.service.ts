import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ERoutePath } from '../../components/data-types/enums';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private router: Router) { }

  navigateByUrl(routePath: ERoutePath): void {
    this.router.navigate([ERoutePath[routePath]]);
  }
}
