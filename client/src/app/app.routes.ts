import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ERoutePath } from './components/data-types/enums';
import { RankingComponent } from './pages/ranking/ranking.component';
import { authGuard } from './components/guards/auth/auth.guard';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: MainComponent      
    },
    {
      path: ERoutePath[0],
      component: MainComponent,
      canActivate: [authGuard]
    },
    {
      path: ERoutePath[1],
      component: UserComponent
    },
    {
      path: ERoutePath[2],
      component: RankingComponent,
      canActivate: [authGuard]
    },
    {
      path: '**',
      component: UserComponent
    }
  ];
