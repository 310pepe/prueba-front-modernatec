import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {

  userForm:FormGroup;
  constructor(
    private fb:FormBuilder,
    private userService:UsuariosService
  ) { 
    this.loadForm()
  }

  ngOnInit() {}

  loadForm(){
    this.userForm= this.fb.group({
      name:[,Validators.required],
      apellidos:[,Validators.required],
      numero_identificacion:[,Validators.required],
      telefono:[,Validators.required],
      email:[,Validators.required],
      rol:[,Validators.required],
      id_contrato:[,Validators.required],
      fecha_inicio:[,Validators.required],
      fecha_fin:[,Validators.required]
    })
  }

  crear(){
    console.log(this.userForm.value);
    const { fecha_inicio, fecha_fin, id_contrato } =this.userForm.value
    const dataContrato={
      fecha_fin,
      fecha_inicio,
      id_contrato
    }
    this.userService.createContrato(dataContrato).subscribe(
      (resp:any)=>{
        this.userForm.value.id_contrato=resp.id_contrato.id;
        this.userForm.value.estado="true";
        this.userForm.value.id_area=1
        this.userForm.value.password="Modernatec2021*"
        this.userService.createUser(this.userForm.value).subscribe(
          resp=>{
            console.log(resp);  
          }
        )
      }
    )
  }

}
