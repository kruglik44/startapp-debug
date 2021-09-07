import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TruckNotification } from 'src/app/modals/truckNotification.model';
import { ManageProfileService } from '../../services/manageProfile.service';

@Component({
  selector: 'app-make-truck-order',
  templateUrl: './make-truck-order.component.html',
  styleUrls: ['./make-truck-order.component.scss'],
})
export class MakeTruckOrderComponent implements OnInit {

  constructor(public modalController: ModalController,
              public noteService: ManageProfileService) { }

  @Input() companyName: string;
  notify: any;
  transportArray = [];
  ngOnInit() {
    const userId = JSON.parse(localStorage.getItem('userData')).id;
    this.noteService.getProfileData(userId).subscribe(response => {
      let array = [];
      for (const key in response[0].autopark){
        if(response[0].autopark.hasOwnProperty(key)){
          array.push({...response[0].autopark[key]});
        }
      }
      array.forEach(element => {
        this.transportArray.push({name: element.name})
      });
      console.log(this.transportArray);
    })
  }

  close(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  onSubmit(form: NgForm){
    if (!form.valid){
      return;
    }
    const notification = new TruckNotification(form.value.car, 
      form.value.type, 
      form.value.volume, 
      form.value.capasity, 
      form.value.from, 
      form.value.to, 
      form.value.date, 
      form.value.bet,
      this.companyName,
      JSON.parse(localStorage.getItem('userData')).id);
      console.log(notification);
      this.noteService.sendTruckNotify(notification).subscribe(response => {
        console.log(response);
      })
      this.close();
  }
 
}
