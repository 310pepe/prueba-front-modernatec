import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  usuario:any;
  load:boolean=false;

  constructor(
    private authService:AuthService
  ) {
    authService.perfil().subscribe(
      res=>{
        this.usuario=res;
        this.load=true;
      }
    )
  }

  

  ngOnInit() {}

}
