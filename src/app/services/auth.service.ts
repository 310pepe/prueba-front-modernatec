import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  userToken:string;
  constructor(
    //importar srvicio http
    private http:HttpClient
    ) 
    {
      this.leerToken();
    }

  //url de la api
  protected url = environment.BASE_URL_AUTH;

  login(data:{email:string,password:string}){
    // 
    return this.http.post(`${this.url}/login`,data).pipe(map((data:any)=>{          
      this.guardarToken(data.access_token);
      return data
    }))
  }

  //función para guardar token 
  private guardarToken( token:string )
  {
    //guardamos el token en el localstorage
    this.userToken = token;
    localStorage.setItem('token',token);

    //creamos el tiempo de expiración
    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira',hoy.getTime().toString());
  }
  //función para leer el token de localstorage
  leerToken()
  {
    if( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken='';
    }
    return this.userToken;
  }
  
  //función para destruir el token
  logout(){
    localStorage.removeItem('token');
  }

  //atenticación del token
  autenticar():boolean{  
    //verificar que haya un token en el local storage
    if(!(this.userToken.length>2)){
      return false;
    }
    //Extraer el timepo de expiracion del token
    const expira = Number(localStorage.getItem('expira'));
    //establecer el tiempo de expiracion del token
    const timeExpira = new Date();
    timeExpira.setTime(expira);    
    //Validar si el tiempo de expiración es correcto
    if(timeExpira > new Date()){
      return true;
    }else {
      return false;
    }
  }

  register(data:{
    name:string,
    apellidos:string,
    numero_identificacion:string,
    telefono:string,
    email:string
  }){
    return this.http.post(`${this.url}/Registro_Invitado`,data);
  }

  perfil(){
    return this.http.post(`${this.url}/me`,{token:this.userToken});
  }
}
