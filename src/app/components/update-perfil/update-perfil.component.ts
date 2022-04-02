import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-update-perfil',
  templateUrl: './update-perfil.component.html',
  styleUrls: ['./update-perfil.component.scss'],
})
export class UpdatePerfilComponent implements OnInit {

  load:boolean=false;
  usuario;
  formulario:FormGroup;
  constructor(
    private authservice:AuthService,
    private fb:FormBuilder,
    private router:Router,
    private userService:UsuariosService
  ) { 
    authservice.perfil().subscribe(
      res=>{
        this.usuario= res;
        this.loadForm();
        this.load=true;
      }
    )
  }

  //funcion que carga el formulario
  loadForm(){
    this.formulario=this.fb.group({
      name:[{value:this.usuario.name,disabled:true},],
      apellidos:[{value:this.usuario.apellidos,disabled:true}],
      telefono:[this.usuario.telefono,Validators.required],
      email:[this.usuario.email,Validators.required],
      numero_identificacion:[{value:this.usuario.numero_identificacion,disabled:true}],
      rol:[{value:this.usuario.rol,disabled:true}]
    })
  }
  
  //funcion para actualizar el perfil
  actualizarPerfil(){

    console.log(this.formulario);
    
    console.log('actualizando');
    
    //verficar que todos los campos esten validos
    if (this.formulario.invalid){
      return Object.values(this.formulario.controls).forEach(control=>{
        control.markAsTouched();
      })
    }

    console.log('actualizando');
    

    this.usuario.telefono=this.formulario.value.telefono;
    this.usuario.email=this.formulario.value.email;

    this.userService.updateUser(this.usuario).subscribe(
      res=>{
        console.log(res);  
      }
    )

  }

  ngOnInit() {}

}
