import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { YaEvent } from 'angular8-yandex-maps';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.scss'],
})
export class NoteModalComponent implements OnInit {
  @Input() note: any;
  @Input() profileType: any;
  public routePanelParameters = {
    options: {
      showHeader: false,
      title: "Расчёт доставки",
      maxWidth: '176px'
    },
    state: {
      show: false,
      type: 'auto',
      fromEnabled: false,
      from: '',
      toEnabled: false,
      to: ''
    }
  };
  public zoomControlParameters = {
    options: {
      size: "small",
      float: "none",
      position: {
        bottom: 145,
        right: 10
      }
    }
  };
  tariff;
  distance;
  price;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.note);
    this.routePanelParameters.state.from = this.note.from;
    this.routePanelParameters.state.to = this.note.to;
    this.tariff = this.note.bet;
  }

  close() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  public onRoutePanelReady(event: YaEvent): void {
    const routePanel = event.target.routePanel;
    routePanel.options.set({
      types: { auto: true }
    });

    // Получим ссылку на маршрут.
    routePanel.getRouteAsync().then((route: any) => {
      // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
      route.model.setParams({ results: 1 }, true);

      // Повесим обработчик на событие построения маршрута.
      route.model.events.add("requestsuccess", () => {
        const activeRoute = route.getActiveRoute();

        if (activeRoute) {
          // Получим протяженность маршрута.
          const length = route.getActiveRoute().properties.get("distance");
          this.distance = length.text;
          // Вычислим стоимость доставки.
          const price = this.calculate(Math.round(length.value / 1000));
          this.price = price;
          // Создадим макет содержимого балуна маршрута.
          const balloonContentLayout = event.ymaps.templateLayoutFactory
            .createClass(`
              <span>Расстояние: ${length.text}.</span><br/>
              <span style="font-weight: bold; font-style: italic">Стоимость рейса: ${price} р.</span>
            `);

          // Зададим этот макет для содержимого балуна.
          route.options.set("routeBalloonContentLayout", balloonContentLayout);
          // Откроем балун.
          activeRoute.balloon.open();
        }
      });
    });
  }

  public calculate(routeLength): number {
    return +this.tariff * routeLength;
  }
}
