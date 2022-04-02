import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FaceService } from '../../services/face.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home-seg',
  templateUrl: './home-seg.component.html',
  styleUrls: ['./home-seg.component.scss'],
})
export class HomeSegComponent implements OnInit {

  @ViewChild('video') video:ElementRef;

  persona:any;
  load:boolean=false;
  currentStram;
  constructor(
    private faceService:FaceService,
    private alertController:AlertController
  ) { 
    
  }

  async ngOnInit() {
    await this.checkMedia();
    await this.identify();
  }

  checkMedia()
  {
    if (navigator && navigator.mediaDevices){
      navigator.mediaDevices.getUserMedia({
        audio:false,
        video:true
      }).then((stream)=>{
        console.log(stream);
        this.currentStram=stream;
      }).catch((err)=>{
        console.log(err);
        console.log('no ha permitido prender la cámara');
          
      })
    }else{

    }
  }

  identify(){

    if(this.load){
      
    const picture = document.createElement('canvas') as HTMLCanvasElement;
    const { videoWidth, videoHeight } = this.video.nativeElement

    console.log(videoWidth);
    console.log(videoHeight);
    picture.width=videoWidth;
    picture.height=videoHeight;
    setTimeout(() => {
      picture.getContext('2d').drawImage(this.video.nativeElement,0,0,videoWidth,videoHeight);
    console.log(picture);

    const base = picture.toDataURL();
    const baseArray= base.split(',');
    const base64= baseArray[1];
    
    this.faceService.identifyBase64(base64).subscribe(
      (res:any)=>{
        console.log(res); 
        console.log(res);
         this.persona=res.identifyResults[0].candidates[0];
        this.faceService.getPerson(res.identifyResults[0].candidates[0].personId).subscribe(
          async(res:any)=>{
            const alert= await this.alertController.create(
              {
                header:`Usuario identificado ${res.identificacion}`,
                message:`Porcentage de compatibilidad ${this.persona.confidence}`,
                buttons: ['OK']
              }
            )

            console.log(res);  

            await alert.present();
          }
        )
      }
    )
    
    
    
    console.log(this.video);
    }, 5000);
    }
    
    
    /*
    setInterval(()=>{
      console.log(this.currentStram);  
    },2000)*/
  }

  loadedMetaData(){
    this.video.nativeElement.play();
    this.load=true;
    this.identify();
  }

  play(){

  }

}
