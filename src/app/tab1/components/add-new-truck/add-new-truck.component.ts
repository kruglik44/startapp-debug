import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Truck } from 'src/app/modals/truck.model';
import { ManageProfileService } from '../../services/manageProfile.service';

@Component({
  selector: 'app-add-new-truck',
  templateUrl: './add-new-truck.component.html',
  styleUrls: ['./add-new-truck.component.scss'],
})
export class AddNewTruckComponent implements OnInit {
  @Input() data;

  constructor(public modalController: ModalController, public addCarService: ManageProfileService ) { }

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
    let car = new Truck(form.value.name, form.value.url, form.value.type, form.value.lifting, form.value.size, form.value.amount, form.value.description, form.value.specifications);
    this.addCarService.addNewCarToTransportList(car, this.data.userId, this.data.companyId).subscribe(response => {
      console.log(response);
    })
    form.reset();
  }
}

