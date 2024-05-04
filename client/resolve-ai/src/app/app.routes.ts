import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ERoutePath } from './components/data-types/enums';

export const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: MainComponent
    },
    {
      path: ERoutePath[0],
      component: MainComponent
    },
    {
      path: '**',
      component: MainComponent
    }
  ];
