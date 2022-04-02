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

  //cargar el formulario
  loadForm(){
    this.reporte_form= this.fb.group(
      {
        fecha_1:['',[Validators.required]],
        fecha_2:['',[Validators.required]]
      }
    )
  }
  
  //funcion que se ejecuta al dar clic en submit
  generarReporte(){
    //verficar que todos los campos esten validos
    if (this.reporte_form.invalid){
      return Object.values(this.reporte_form.controls).forEach(control=>{
        control.markAsTouched();
      })
    }
    //llamado al servicio de descarga de reportes
    this.registroService.descargarReporte(this.reporte_form.value).subscribe(
      res=>{
        //reseteamos el formulario
        this.reporte_form.reset();
        //llamamos a la funcion que descarga el archivo    
        this.manageExcel(res,'reporte.xlsx');  
      }
    )
  }

  //funcion que maneja la descarga de archivos
  manageExcel(res,filename){
    //constante que tiene el tipo del documento
    const dataType= res.type;
    //variable que contendra los datos binarios del archivo
    const binaryData = [];
    binaryData.push(res);
    
    const filePath = window.URL.createObjectURL(new Blob(binaryData,{type:dataType}) );
    const donwload = document.createElement('a');
    donwload.href = filePath;
    donwload.setAttribute('download',filename);
    document.body.appendChild(donwload);
    donwload.click();
    document.body.removeChild(donwload);
  }

}
