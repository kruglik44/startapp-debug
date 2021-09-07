import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ManageProfileService } from 'src/app/tab1/services/manageProfile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  profileType;

  profileData = {
    ati_code : '',
    autopark : [],
    avatar : '',
    cargo_amount : '',
    city : '',
    country : '',
    description : '',
    id : '',
    inn : '',
    name : '',
    ogrnip : '',
    profile : '',
    trucks_amount : '',
    years : ''
  };

  cargoProfileData = {
    ati_code : '',
    autopark: [],
    avatar : '',
    tax_type : '',
    city : '',
    country : '',
    description : '',
    id : '',
    inn : '',
    name : '',
    ogrnip : '',
    profile : '',
    web_site : '',
    years : ''
  };

  constructor(private profileService: ManageProfileService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    if (!form.valid){
      return;
    }
    const id = JSON.parse(localStorage.getItem('userData')).id;
    this.profileData.ati_code = form.value.ati_code;
    this.profileData.avatar = form.value.avatar;
    this.profileData.cargo_amount = form.value.cargo_amount;
    this.profileData.city = form.value.city;
    this.profileData.country = form.value.country;
    this.profileData.description = form.value.description;
    this.profileData.id = id;
    this.profileData.inn = form.value.inn;
    this.profileData.name = form.value.name;
    this.profileData.ogrnip = form.value.ogrnip;
    this.profileData.profile = form.value.profile;
    this.profileData.trucks_amount = form.value.trucks_amount;
    this.profileData.years = form.value.years;
    this.profileService.postProfileData(this.profileData, id).subscribe(response => {
      console.log(response);
      this.router.navigate(['/tabs/tab1']);
    })
    form.reset();
  }

  onSubmitCargo(form: NgForm){
    if (!form.valid){
      return;
    }
    const id = JSON.parse(localStorage.getItem('userData')).id;
    this.cargoProfileData.ati_code = form.value.ati_code;
    this.cargoProfileData.avatar = form.value.avatar;
    this.cargoProfileData.tax_type = form.value.tax_type;
    this.cargoProfileData.city = form.value.city;
    this.cargoProfileData.country = form.value.country;
    this.cargoProfileData.description = form.value.description;
    this.cargoProfileData.id = id;
    this.cargoProfileData.inn = form.value.inn;
    this.cargoProfileData.name = form.value.name;
    this.cargoProfileData.ogrnip = form.value.ogrnip;
    this.cargoProfileData.profile = form.value.profile;
    this.cargoProfileData.web_site = form.value.web_site;
    this.cargoProfileData.years = form.value.years;
    this.profileService.postProfileData(this.cargoProfileData, id).subscribe(response => {
      console.log(response);
      this.router.navigate(['/tabs/tab1']);
    })
    form.reset();
  }
}
