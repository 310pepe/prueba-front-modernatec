import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { identity } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = environment.BASE_URL_USUARIOS;
  token: string;
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.token = this.authService.leerToken();
  }

  getUsers(userId) {
    return this.http.post(`${this.url}/index`, { token: this.token }).pipe(map(
      (data: any[]) => {
        let users = [];
        data.map(
          user => {
            if (!(user.id == userId)) {

              let {
                numero_identificacion,
                name,
                apellidos,
                rol,
                email,
                telefono,
                estado,
                url_imagen,
                id_area,
                id_contrato,
                id
              } = user;
              /*switch (rol) {
                case 1:
                  rol="Registros"
                  break;
                case 2:
                  rol="Administrador"
                  break;
                case 3:
                  rol="Seguridad"
                  break;
                default:
                  rol="Visitante"
                  break;
              }*/
              users.push(
                {
                  numero_identificacion,
                  name,
                  apellidos,
                  email,
                  rol,
                  telefono,
                  estado,
                  url_imagen,
                  id_area,
                  id_contrato,
                  id
                }
              )
            }

          }
        );
        return users
      }
    ))
  }

  getUser(id) {
    return this.http.post(`${this.url}/index`, { token: this.token }).pipe(map(
      (data: any[]) => {
        let userF = []
        const base = data.map(user => {
          if (user.id == id) {
            userF.push(user);
          }
        })
        return userF;
      }
    ))
  }

  getUserId(data){
    data.token=this.token;
    return this.http.post(`${this.url}/show`,data)
  }

  updateUser(data) {
    data.token = this.token;
    return this.http.put(`${this.url}/update/${data.id}`, data);
  }

  createContrato(data){
    data.token= this.token;
    return this.http.post(`${this.url}/contrato`,data)
  }

  createUser(data){
    data.token=this.token;
    return this.http.post(`${this.url}/store`,data);
  }
}
