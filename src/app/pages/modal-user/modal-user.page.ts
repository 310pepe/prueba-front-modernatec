import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.page.html',
  styleUrls: ['./modal-user.page.scss'],
})
export class ModalUserPage implements OnInit {

  @Input() usuario;

  constructor(
    private modalController:ModalController
  ) { }

  ngOnInit() {
  }
  cerrar(){
    this.modalController.dismiss();
  }
}
