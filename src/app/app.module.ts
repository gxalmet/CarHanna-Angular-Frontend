import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthService } from './services/Auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgSelectModule } from '@ng-select/ng-select'; 
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { ChildProjectsComponent } from './components/child-projects/child-projects.component';
import { CollegueComponent } from './components/collegue/collegue.component';
import { MessageComponent } from './components/message/message.component'

import { CalendarComponent } from './components/calendar/calendar.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { MyTeamComponent } from './components/my-team/my-team.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CreateProjectComponent,
    ProjectsComponent,
    HomeComponent,
    ErrorComponent,
    MainNavComponent,
    CalendarComponent,
    EditProjectComponent,
    MyTeamComponent,
    AgendaComponent,
    ChildProjectsComponent,
    CollegueComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ AuthService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
