import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.scss'],
})
export class CambiarPasswordComponent implements OnInit {

  formulario:FormGroup;

  constructor(
    private fb:FormBuilder
  ) { 
    //llamar a la funcion que carga el formulario
    this.loadForm();
  }

  //Cargar formulario
  loadForm(){
    this.formulario=this.fb.group({

    })
  }

  cambiarPass(){
    
  }

  ngOnInit() {}

}
