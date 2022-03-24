import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-data-base',
  templateUrl: './data-base.component.html',
  styleUrls: ['./data-base.component.scss'],
})
export class DataBaseComponent implements OnInit {

  load:boolean=false;
  errores:any[];
  archivo:File
  dbForm:FormGroup
  constructor(
    private fb:FormBuilder,
    private registroService:RegistroService
  ) { 
    this.loadForm()
   }

  ngOnInit() {}

  loadForm(){
    this.dbForm= this.fb.group({
      file:[,Validators.required]
    })
  }
  cambiarArchivo(file:File){
    this.archivo=file  
  }

  subirdb(){
   
    
    this.registroService.subirDb(this.archivo).subscribe(
      (rep:any)=>{
        console.log(rep);
        this.errores=rep.errores
        this.load=true
      }
    )
  }
}
