import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthService } from '../components/auth/auth.service';
import { AddNewTruckComponent } from './components/add-new-truck/add-new-truck.component';
import { MakeCargoOrderComponent } from './components/make-cargo-order/make-cargo-order.component';
import { MakeTruckOrderComponent } from './components/make-truck-order/make-truck-order.component';
import { ManageProfileService } from './services/manageProfile.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  profile;
  profileType;
  transportList = [];
  constructor(private authService: AuthService,
    private profileService: ManageProfileService,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController) {}

  ngOnInit(){
    const userId = JSON.parse(localStorage.getItem('userData')).id;
    this.profileService.getProfileType(userId).subscribe(response => {
      this.profileType = response[0].profile;
      localStorage.setItem('userType', this.profileType);
      this.profileService.getProfileData(userId).subscribe(response => {
        console.log(response);
        this.profile = response[0];
        for (const key in this.profile.autopark){
          if(this.profile.autopark.hasOwnProperty(key)){
            this.transportList.push({...this.profile.autopark[key]});
          }
        }
      });
    })
  }

  onLogout(){
    this.authService.logout();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Добавить машину',
        icon: 'car',
        handler: () => {
          console.log('Share clicked');
          this.addNewTruck();
        }
      }, {
        text: 'Функция в разработке',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Выйти',
        icon: 'exit',
        handler: () => {
          console.log('Favorite clicked');
          this.onLogout();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentActionCargoSheet(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Функция в разработке',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Выйти',
        icon: 'exit',
        handler: () => {
          console.log('Favorite clicked');
          this.onLogout();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async postTruckModal() {
    const modal = await this.modalController.create({
      component: MakeTruckOrderComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        companyName: this.profile.name,
      }
    });
    return await modal.present();
  }

  async addNewTruck() {
    const modal = await this.modalController.create({
      component: AddNewTruckComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        data: {
          userId:  JSON.parse(localStorage.getItem('userData')).id,
          companyId: this.profile.id
        },
      }
    });
    return await modal.present();
  }

  async postCargoModal(){
    const modal = await this.modalController.create({
      component: MakeCargoOrderComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        companyName: this.profile.name,
      }
    });
    return await modal.present();
  }

  doRefresh(event) {
    this.transportList = [];
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 500);
  }

}
