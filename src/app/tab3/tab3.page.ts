import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoteModalComponent } from './components/note-modal/note-modal.component';
import { TransportListService } from './services/transportList.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  orderList = [];
  profileType;
  constructor(private transportListService: TransportListService,  public modalController: ModalController) {}

  ngOnInit(){
    this.profileType = localStorage.getItem('userType');
    this.transportListService.getTransportList().subscribe(response => {
      console.log(response);
      this.orderList = response;
    })
  }

  doRefresh(event) {
    this.orderList = [];
    setTimeout(() => {
      this.ngOnInit();
    event.target.complete();
    }, 500);
  }

  async selectTruckNote(note){
    const modal = await this.modalController.create({
      component: NoteModalComponent ,
      cssClass: 'my-custom-class',
      componentProps: {
        note: note,
        profileType: this.profileType
      }
    });
    return await modal.present();
  }
}
