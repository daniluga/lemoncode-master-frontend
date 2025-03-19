import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { UserListComponent } from './user/user-list/user-list.component';

/**
 * Regla del pulgar -> Hacer rutas relativas, es mejor si hay que refactorizar.
 *
 * Angular evalúa rutas, de arriba hacía abajo, por lo que es importante tener
 * en cuenta el orden de las rutas porque la primera que coincida la usará.
 *
 * Siempre se debe tener una ruta por defecto, en caso de que no se encuentre
 * la ruta solicitada.
 */
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'users', component: UserListComponent },
];
