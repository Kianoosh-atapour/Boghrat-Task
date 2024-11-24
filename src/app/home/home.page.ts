import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  IonAlert,
} from '@ionic/angular/standalone';
import { lastValueFrom } from 'rxjs';
import { IList } from './model/home';
import { PersianDatePipe } from './pipe/persian-date.pipe';
import { HomeService } from './service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonAlert,
    IonButton,
    IonButtons,
    IonSearchbar,
    IonCardSubtitle,
    IonCardTitle,
    PersianDatePipe,
    IonLabel,
    IonCol,
    IonRow,
    IonGrid,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
  providers: [HomeService],
})
export class HomePage implements OnInit {
  list: IList[] = [];
  listTemp: IList[] = [];
  columns: any[] = [[], [], []];
  public alertButtons = [
    {
      text: 'done',
      handler: (event: any[]) => {
        this.calcPrice(Number(event[0]));
      },
    },
  ];
  public alertInputs = [
    {
      type: 'number',
      placeholder: 'price',
    },
  ];

  constructor(private homeService: HomeService) {}

  async ngOnInit() {
    this.list = await lastValueFrom(this.homeService.getList());
    this.listTemp = this.list;
    this.fillColumns(this.list);
  }

  fillColumns(list: IList[]): void {
    this.columns = [[], [], []];
    let currentColumn = 0;
    list.forEach((card) => {
      this.columns[currentColumn].push(card);
      currentColumn = (currentColumn + 1) % 3;
    });
  }

  search(event: any): void {
    this.list = this.listTemp;
    const text = event.target.value;
    if (!text || text == '') this.list = this.listTemp;
    else {
      this.list = this.list.filter(
        (l) => l.abstract?.includes(text) || l.title?.includes(text)
      );
    }
    this.fillColumns(this.list);
  }

  calcPrice(price: number): void {
    const fee = this.homeService.calculateOperatingFee(price);
    alert(`Fee = ${fee.toLocaleString()}`);
  }
}
