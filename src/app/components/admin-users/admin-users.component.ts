import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

import { ModalController } from '@ionic/angular';
import { ModalUserPage } from '../../pages/modal-user/modal-user.page';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {

  perfil:any;
  usuarios:any[];
  usuariosB:any[];
  busqueda:boolean=false;
  constructor(
    private userService:UsuariosService,
    private modalController:ModalController,
    private authService:AuthService
  ) {
    
    this.userService.getUsers('1').subscribe(
      (res:any)=>{
        this.usuarios=res;  
        console.log(res);
        
      }
    )
    
  }
  ngOnInit() {}

  async traerUsuarios(){
    await this.authService.perfil().subscribe(
      res=>{
        this.perfil=res;
      }
    )
    
    this.userService.getUsers(this.perfil.id).subscribe(
      (res:any)=>{
        this.usuarios=res;  
        console.log(res);
      }
    )
  }
 

  buscar(id){
    this.usuariosB=[];
    this.usuarios.forEach(user => {
      if(user.numero_identificacion==id){
        this.usuariosB.push(user)
      }
    });    
    this.busqueda=true;
    console.log(this.usuariosB);
  }

  async abrirModal(usuario){
    const modal = await this.modalController.create({
      component: ModalUserPage,
      componentProps:{
        usuario
      }
    });
    await modal.present();
  }
  
  

}
