import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {

  load:boolean=false;
  id:string='';
  usuario:any=[]=[];
  userForm:FormGroup;
  constructor(
    private routerAc:ActivatedRoute,
    private userService:UsuariosService,
    private fb:FormBuilder
  ) { 
    this.routerAc.params.subscribe(
      (params)=>{
      this.id=params.id
      this.userService.getUser(this.id).subscribe(
        async(res)=>{
          this.usuario=res;
          this.load=true;
          this.loadForm();
        }
      )
    });
    
    
    
  }

  ngOnInit() {}


  getUser(id){
    this.userService.getUser(id).subscribe(
      async(res)=>{
        this.usuario=res;
        console.log(this.usuario);
        
      }
    )
  }
  loadForm(){
    this.userForm=this.fb.group({
      name:[this.usuario[0].name],
      apellidos:[this.usuario[0].apellidos],
      numero_identificacion:[this.usuario[0].numero_identificacion],
      telefono:[this.usuario[0].telefono],
      email:[this.usuario[0].email],
      rol:[this.usuario[0].rol],
      id_contrato:[],
      fecha_inicio:[],
      fecha_fin:[]
    })
  }

  actualizar(){
    const values =this.userForm.value
    this.usuario[0].name= values.name
    this.usuario[0].apellidos=values.apellidos
    this.usuario[0].email= values.email
    this.usuario[0].numero_identificación= values.numero_identificación
    this.usuario[0].rol=values.rol
    this.usuario[0].telefono=values.telefono

    console.log(this.usuario[0]);
    

    this.userService.updateUser(this.usuario[0]).subscribe(
      resp=>{
        console.log(resp);
        
      }
    )
  }
}
