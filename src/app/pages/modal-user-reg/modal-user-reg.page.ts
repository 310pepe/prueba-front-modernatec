import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-user-reg',
  templateUrl: './modal-user-reg.page.html',
  styleUrls: ['./modal-user-reg.page.scss'],
})
export class ModalUserRegPage implements OnInit {

  @Input() usuario;

  constructor(
    private modalController:ModalController,
    private userService:UsuariosService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  cerrarD(){
    this.modalController.dismiss();
  }

  cerrar(){
    this.router.navigate([`user/update-user/${this.usuario.id}`])
    this.modalController.dismiss();
  }
  activar(){
    this.usuario.estado="true";
    this.userService.updateUser(this.usuario).subscribe(
      res=>{
        console.log(res);  
      }
    )
  }
  desactivar(){
    this.usuario.estado="false";
    console.log(this.usuario);
    
    this.userService.updateUser(this.usuario).subscribe(
      res=>{
        console.log(res);  
      }
    )
  }
}
