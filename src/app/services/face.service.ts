import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FaceService {

  url:string=environment.BASE_URL_FACE;
  userToken:string;
  constructor(
    private http:HttpClient,
    private authService:AuthService
  ) { 
    this.userToken = authService.leerToken();
  }

  identifyBase64(data){
    const formData = new FormData();
    
    formData.append('img',data);

    return this.http.post(`${this.url}/identifypersonbase64`,formData);
  }

  getPerson(id){    
    return this.http.get(`${this.url}/persongrouppersonid/`,{params:{idperson:id}})
  }
}
