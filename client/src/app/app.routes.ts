import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { ReportsComponent } from './components/reports/reports.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
    {path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},
    {path: 'myprofile', component: MyProfileComponent, canActivate: [AuthGuard]},
    {path: 'myevents', component: MyEventsComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
    {path: 'admindashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]},
    {path: 'eventlist', component: EventListComponent, canActivate: [AuthGuard]}
];
