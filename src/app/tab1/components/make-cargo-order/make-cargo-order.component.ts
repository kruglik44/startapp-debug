import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CargoNotification } from 'src/app/modals/cargoNotification.modal';
import { ManageProfileService } from '../../services/manageProfile.service';

@Component({
  selector: 'app-make-cargo-order',
  templateUrl: './make-cargo-order.component.html',
  styleUrls: ['./make-cargo-order.component.scss'],
})
export class MakeCargoOrderComponent implements OnInit {

  @Input() companyName;
  constructor(public modalController: ModalController, public noteService: ManageProfileService) { }

  ngOnInit() {}
  
  close(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  onSubmit(form: NgForm){
    if (!form.valid){
      return;
    }
    const notification = new CargoNotification(
      form.value.cargo, 
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
      this.noteService.sendCargoNotify(notification).subscribe(response => {
        console.log(response);
      })
      this.close();
  }
}
