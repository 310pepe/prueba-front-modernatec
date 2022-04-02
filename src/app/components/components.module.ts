import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { ReportesComponent } from './reportes/reportes.component';
import { UpdatePerfilComponent } from './update-perfil/update-perfil.component';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { ConfimacionCitaComponent } from './confimacion-cita/confimacion-cita.component';
import { CodigoCitaComponent } from './codigo-cita/codigo-cita.component';
import { HomeRegisComponent } from './home-regis/home-regis.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DataBaseComponent } from './data-base/data-base.component';
import { CitasComponent } from './citas/citas.component';
import { CreateCitaComponent } from './create-cita/create-cita.component';
import { UpdateCitaComponent } from './update-cita/update-cita.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeSegComponent } from './home-seg/home-seg.component';



@NgModule({
  declarations: [
    HomeAdminComponent,
    MenuComponent,
    AdminUsersComponent,
    PerfilComponent,
    CambiarPasswordComponent,
    ReportesComponent,
    UpdatePerfilComponent,
    ConfimacionCitaComponent,
    CodigoCitaComponent,
    HomeRegisComponent,
    UpdateUserComponent,
    CreateUserComponent,
    DataBaseComponent,
    CitasComponent,
    CreateCitaComponent,
    UpdateCitaComponent,
    HomeSegComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    NgChartsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    HomeAdminComponent,
    MenuComponent,
    AdminUsersComponent,
    PerfilComponent,
    CambiarPasswordComponent,
    ReportesComponent,
    UpdatePerfilComponent,
    ConfimacionCitaComponent,
    CodigoCitaComponent,
    HomeRegisComponent,
    UpdateUserComponent,
    CreateUserComponent,
    DataBaseComponent,
    CitasComponent,
    CreateCitaComponent,
    UpdateCitaComponent,
    HomeSegComponent
  ]
})
export class ComponentsModule { }
