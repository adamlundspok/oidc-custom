import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './views/dashboard.component';
import { LoginService } from './shared/loginmanager.service';

import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'Forbidden', component: ForbiddenComponent },
    { path: 'Unauthorized', component: UnauthorizedComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [LoginService] },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
