import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { TaskListComponent } from './tasks/task-list/task-list';
import { AuthGuard } from './guards/auth-guard';
import { Cat } from './meow/cat/cat';
import { TaskFormComponent } from './tasks/task-form/task-form';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login on empty path
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-tasks', component: TaskListComponent, canActivate: [AuthGuard] },
    { path: 'show-tasks', component: TaskFormComponent },

];

export const appRoutes = provideRouter(routes);
