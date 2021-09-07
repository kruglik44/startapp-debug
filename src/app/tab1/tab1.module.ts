import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { MakeTruckOrderComponent } from './components/make-truck-order/make-truck-order.component';
import { AddNewTruckComponent } from './components/add-new-truck/add-new-truck.component';
import { MakeCargoOrderComponent } from './components/make-cargo-order/make-cargo-order.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page, MakeTruckOrderComponent, MakeCargoOrderComponent, AddNewTruckComponent]
})
export class Tab1PageModule {}
