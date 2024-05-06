import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ERoutePath } from './components/data-types/enums';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: LoginComponent
    },
    {
      path: ERoutePath[0],
      component: MainComponent
    },
    {
      path: ERoutePath[1],
      component: LoginComponent
    },
    {
      path: '**',
      component: MainComponent
    }
  ];
