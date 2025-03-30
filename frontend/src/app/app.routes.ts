import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectFormComponent } from './project-form/project.form.component';
import { RegistrationComponent } from './login/registration.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'project-form', component: ProjectFormComponent },
  { path: 'register', component: RegistrationComponent }
];
