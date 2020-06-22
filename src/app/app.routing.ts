//Imports Necesarios
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar los componentes

import { LoginComponent } from './componets/login/login.component';
import { RegisterComponent} from './componets/register/register.component';
import { HomeComponent} from './componets/home/home.component';
import { ErrorComponent} from './componets/error/error.component';
import { UserEditComponent } from './componets/user-edit/user-edit.component';
import { CategoryNewComponent } from './componets/category-new/category-new.component';
import { PostNewComponent } from './componets/post-new/post-new.component';
import { PostDetailComponent } from './componets/post-detail/post-detail.component';

//DEfinir las rutas
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'inicio', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'ajustes', component: UserEditComponent},
    {path: 'crear-categoria', component: CategoryNewComponent},
    {path: 'crear-post', component: PostNewComponent},
    {path: 'entrada/:id', component: PostDetailComponent},
    {path: '**', component: ErrorComponent} 
];

//Exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);