import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CitasService } from '../../services/citas.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-cita',
  templateUrl: './create-cita.component.html',
  styleUrls: ['./create-cita.component.scss'],
})
export class CreateCitaComponent implements OnInit {

  codigo:string
  usuario;
  citaForm:FormGroup
  constructor(
    private fb:FormBuilder,
    private citasService:CitasService,
    private userService:UsuariosService,
    private router:Router
  ) {
    this.loadForm();
  }

  ngOnInit() {}


  //cargar formulario
  loadForm(){
    this.citaForm= this.fb.group({
      numero_identificacion:[this.usuario?.hi || '' ],
      telefono:[ this.usuario?.telefono || '' ],
      name:[],
      apellidos:[],
      correo_invitado:[],
      area:[],
      correo_solicitante:[],
      fecha:[],
      hora:[],
      codigo_cita: new FormControl({value:'',disabled:true},Validators.required)
    })

    const dig1 = Math.floor(Math.random() * (9 - 0) + 0);
    const dig2 = Math.floor(Math.random() * (9 - 0) + 0);
    const dig3 = Math.floor(Math.random() * (9 - 0) + 0);
    const dig4 = Math.floor(Math.random() * (9 - 0) + 0);
    const dig5 = Math.floor(Math.random() * (9 - 0) + 0);
    const dig6 = Math.floor(Math.random() * (9 - 0) + 0);
    this.codigo = dig1.toString()+dig2.toString()+dig3.toString()+dig4.toString()+dig5.toString()+dig6.toString();

    this.citaForm.controls.codigo_cita.setValue(this.codigo)
    console.log(this.codigo);
    
    
  }

  //buscar si existe un usuario con el numero de identificación digitado
  buscar(){
    //emplear servicio que busca a una persona por un numero de identificación
    this.userService.getUserId({numero_identificacion:this.citaForm.value.numero_identificacion}).subscribe(
      (resp:any)=>{
        //asignamos el valor de la respuesta a la variable local usuario
        this.usuario=resp;
        //asignamos los valores correspondientes a los campos si se obtiene una respuesta satisfactoria
        this.citaForm.controls.name.setValue(this.usuario?.name)
        this.citaForm.controls.telefono.setValue(this.usuario?.telefono)
        this.citaForm.controls.apellidos.setValue(this.usuario?.apellidos)
        this.citaForm.controls.correo_invitado.setValue(this.usuario?.email)        
      }
    )
  }

  //crear cita
  crearCita(){
    //establecer la llave primaria de la tabla al numero de identificación
    this.citaForm.value.numero_identificacion=this.usuario.id;
    this.citaForm.value.codigo_cita=this.codigo;
    console.log(this.citaForm.value);


    this.citasService.createCita(this.citaForm.value).subscribe(
      resp=>{
        console.log(resp);
        this.router.navigateByUrl('/user/citas');
      }
    )
  }

}
