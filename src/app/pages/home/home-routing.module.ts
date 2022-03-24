import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importación de los componentes a utilizar
import { HomePage } from './home.page';
import { HomeAdminComponent } from '../../components/home-admin/home-admin.component';
import { AdminUsersComponent } from '../../components/admin-users/admin-users.component';
import { ReportesComponent } from '../../components/reportes/reportes.component';
import { PerfilComponent } from '../../components/perfil/perfil.component';
import { CambiarPasswordComponent } from '../../components/cambiar-password/cambiar-password.component';
import { UpdatePerfilComponent } from '../../components/update-perfil/update-perfil.component';
import { HomeRegisComponent } from '../../components/home-regis/home-regis.component';
import { UpdateUserComponent } from '../../components/update-user/update-user.component';
import { CreateUserComponent } from '../../components/create-user/create-user.component';
import { UpdateCitaComponent } from '../../components/update-cita/update-cita.component';
import { CreateCitaComponent } from '../../components/create-cita/create-cita.component';
import { DataBaseComponent } from '../../components/data-base/data-base.component';
import { HomeSegComponent } from '../../components/home-seg/home-seg.component';
import { CodigoCitaComponent } from '../../components/codigo-cita/codigo-cita.component';
import { FotoCitaComponent } from '../../components/foto-cita/foto-cita.component';
import { ConfimacionCitaComponent } from '../../components/confimacion-cita/confimacion-cita.component';
import { CitasComponent } from '../../components/citas/citas.component';

const routes: Routes = [
  {//declaración de la ruta principal
    path: '',
    component: HomePage,
    //declaración de las rutas hijas
    children:[
      {
        path:'admin-home',
        component:HomeAdminComponent
      },
      {
        path:'admin-users',
        component:AdminUsersComponent
      },
      {
        path:'admin-reportes',
        component:ReportesComponent
      },
      {
        path:'perfil',
        component:PerfilComponent
      },
      {
        path:'changepass',
        component:CambiarPasswordComponent
      },
      {
        path:'update-perfil',
        component:UpdatePerfilComponent
      },
      {
        path:'admin-regis',
        component:HomeRegisComponent
      },
      {
        path:'update-user/:id',
        component:UpdateUserComponent
      },
      {
        path:'create-user',
        component:CreateUserComponent
      },
      {
        path:'update-cita/:id',
        component:UpdateCitaComponent
      },
      {
        path:'create-cita',
        component:CreateCitaComponent
      },
      {
        path:'data-base',
        component:DataBaseComponent
      },
      {
        path:'home-seg',
        component:HomeSegComponent
      },
      {
        path:'verificar-cita',
        component:CodigoCitaComponent
      },
      {
        path:'foto-visitante',
        component:FotoCitaComponent
      },
      {
        path:'confirmar-cita',
        component:ConfimacionCitaComponent
      },
      {
        path:'citas',
        component:CitasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
