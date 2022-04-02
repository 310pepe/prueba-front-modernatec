import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  userToken:string;
  url=environment.BASE_URL_REGISTRO;
  constructor(
    private http:HttpClient
  ) { 
    this.leerToken();
  }

  leerToken()
  {
    if( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken='';
    }
    return this.userToken;
  }

  descargarReporte(data:{
    token:string
    fecha_1:string,
    fecha_2:string 
  }){
    data.token=this.userToken
    
    return this.http.post(`${this.url}/export`,data,{responseType:'blob'as 'json'})
  }

  subirDb(data){
    console.log(data);
    
    let formData = new FormData();
    
    formData.append("file",data);
    formData.append("token",this.userToken);
    
    
    return this.http.post(`${this.url}/Base_datos`,formData)
  }
}
