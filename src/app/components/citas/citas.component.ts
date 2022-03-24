import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
})
export class CitasComponent implements OnInit {

  allCitas:any[]=[];
  dayCitas:any[]=[];
  date=new Date();
  constructor(
    private citasService:CitasService
  ) {
    citasService.getCitas().subscribe(
      (resp:any)=>{
        console.log(resp);
        this.allCitas=resp;
        this.allCitas.map(
          cita=>{
            const fecha = new Date(cita.fecha);        
            if(this.date.toLocaleDateString()==fecha.toLocaleDateString())
            {
              this.dayCitas.push(cita);
              console.log(this.dayCitas);
              
            }
          }
        )
        
      }
    )
  }

  ngOnInit() {}

  cambioFecha(event){
    this.date= new Date(event.detail.value);
    console.log(this.date);
    this.dayCitas=[];
    this.allCitas.map(
      cita=>{
        console.log(cita.fecha);
        
        const fecha = new Date(cita.fecha);  
        console.log(fecha);
        
        function addDaysToDate(date, days){
          var res = new Date(date);
          res.setDate(res.getDate() + days);
          return res;
      }

        const real = addDaysToDate(fecha,1);

        console.log(this.date.toLocaleDateString());
        console.log(fecha.toLocaleDateString());
        
              
        if(this.date.toLocaleDateString()==real.toLocaleDateString())
        {
          this.dayCitas.push(cita);
          console.log(this.dayCitas);
          
        }
      }
    )

    console.log(this.dayCitas);
    

    
  }

}
