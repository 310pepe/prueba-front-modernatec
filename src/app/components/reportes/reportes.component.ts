import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent implements OnInit {

  protected alerta:HTMLIonAlertElement;
  //* -> Implementacion de propiedad del formGroup
  public reporte_form: FormGroup

  constructor(
    private registroService:RegistroService,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.loadForm()
  }

  //retorna si el campo password se ha ingresado
  get fecha_1NoValido(){
    return this.reporte_form.get('fecha_1').invalid && this.reporte_form.get('fecha_1').touched
  }
  //retorna si el campo password se ha ingresado
  get fecha_2NoValido(){
    return this.reporte_form.get('fecha_2').invalid && this.reporte_form.get('fecha_2').touched
  }

  loadForm(){
    this.reporte_form= this.fb.group(
      {
        fecha_1:['',[Validators.required]],
        fecha_2:['',[Validators.required]]
      }
    )
  }
  
  generarReporte(){
    if (this.reporte_form.invalid){
      return Object.values(this.reporte_form.controls).forEach(control=>{
        control.markAsTouched();
      })
    }
    this.registroService.descargarReporte(this.reporte_form.value).subscribe(
      res=>{
        console.log('todo bien');
        console.log(res);
        
      }
    )
  }

}
