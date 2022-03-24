import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  opciones:any[]

  constructor(
    private authService:AuthService,
    
  ) { }

  ngOnInit() {
    this.authService.perfil().subscribe(
      (res:any)=>{
        switch (res.rol) {
          case 1:
            this.opciones=[
              {
                name:'Usuarios',
                url:'/user/admin-regis'
              },
              {
                name:'Citas',
                url:'/user/citas'
              }
            ]
            break;
          case 2:
            this.opciones=[
              {
                name:'Reportes',
                url:'/user/admin-home'
              },
              {
                name:'Usuarios',
                url:'/user/admin-users'
              }
            ]
            break;
          case 3:
            this.opciones=[
                {
                  name:'Inicio',
                  url:'/user/home-seg'
                },
                {
                  name:'Visitante',
                  url:'/user/verificar-cita'
                }
              ]
            break;
        }
      }
    )
  }


}
