import { Component, OnInit } from '@angular/core';
import { ManageCargoService } from './services/manageCargo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private cargoService: ManageCargoService) {}

  cargoList = [];

  ngOnInit(){
    this.cargoService.getCargoList().subscribe(response => {
      console.log(response);
      this.cargoList = response;
    })
  }

  doRefresh(event) {
    this.cargoList = [];
    setTimeout(() => {
      this.ngOnInit();
    event.target.complete();
    }, 500);
  }
}
