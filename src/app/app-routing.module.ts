import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRouteSnapshot} from '@angular/router';
import { RouterStateSnapshot} from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ErrorComponent } from './components/error/error.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { MyTeamComponent } from './components/my-team/my-team.component';
import { AgendaComponent } from './components/agenda/agenda.component';

export const resolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log('hero');
  console.log(route);
  console.log(state);
}

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'createproject/:id', component: CreateProjectComponent},
  {path: 'createproject', component: CreateProjectComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'agenda', component: AgendaComponent},
  {path: 'editproject', component: EditProjectComponent, 
          // resolve: {results: 'Resolver'},
          runGuardsAndResolvers: (curr: ActivatedRouteSnapshot, future: ActivatedRouteSnapshot) => {
            return true;
          }},
  {path: 'myteam', component: MyTeamComponent},
  {path: '**', component: ErrorComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes , {onSameUrlNavigation: 'reload'} ) ],
  exports: [RouterModule],
  // providers: [
  //   {
  //     provide: 'Resolver',
  //     useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => resolver
  //   }
  // ]
})

export class AppRoutingModule { }
