import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CitasService } from '../../services/citas.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-update-cita',
  templateUrl: './update-cita.component.html',
  styleUrls: ['./update-cita.component.scss'],
})
export class UpdateCitaComponent implements OnInit {

  load:boolean=false;
  usuario:any;
  citaForm:FormGroup
  cita:any;
  constructor(
    private routerAc:ActivatedRoute,
    private router:Router,
    private fb:FormBuilder,
    private citasService:CitasService,
    private userService:UsuariosService
  ) { 

    routerAc.params.subscribe(
      params=>{
        this.citasService.getCita({codigo_cita:params.id}).subscribe(
          resp=>{
            this.cita=resp;
            this.userService.getUser(this.cita.numero_identificacion).subscribe(
              res=>{
                console.log(res);
                this.usuario=res[0];
                this.load=true
                this.loadForm();
              }
            )  
          }
        )
      }
    )
    
  }

  loadForm(){
    this.citaForm=this.fb.group({
      numero_identificacion:new FormControl({value:this.usuario.numero_identificacion,disabled:true}),
      telefono:new FormControl({value:this.usuario.telefono,disabled:true}),
      name:new FormControl({value:this.usuario.name,disabled:true}),
      apellidos:new FormControl({value:this.usuario.apellidos,disabled:true}),
      correo_invitado:new FormControl({value:this.cita.correo_invitado,disabled:true}),
      area:[ this.cita.area ],
      correo_solicitante:[ this.cita.correo_solicitante ],
      fecha:[ this.cita.fecha ],
      hora:[ this.cita.hora ],
      codigo_cita: new FormControl({value:this.cita.codigo_cita,disabled:true},Validators.required)
    })
  }
  ngOnInit() {}

  actualizar(){
    console.log(this.citaForm.value);
    this.cita.area=this.citaForm.value.area;
    this.cita.correo_solicitante=this.citaForm.value.correo_solicitante;
    this.cita.fecha=this.citaForm.value.fecha;
    this.cita.hora=this.citaForm.value.hora;
    
    this.citasService.updateCita(this.cita).subscribe(
      res=>{
        this.router.navigateByUrl('/user/citas')
      }
    ) 
  }

  delete(){
    this.citasService.deleteCita({id:this.cita.id}).subscribe(
      res=>{
        console.log(res);
        this.router.navigateByUrl('/user/citas')
      }
    )
  }
}
