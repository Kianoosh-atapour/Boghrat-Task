import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IList } from '../model/home';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  price1 = 30000000;
  price2 = 40000000;
  price3 = 50000000;
  constructor(private httpClient: HttpClient) {}

  getList(): Observable<IList[]> {
    return this.httpClient.get<IList[]>(
      'https://cdn.boghrat.com/api/codeChallenge/angular'
    );
  }

  calculateOperatingFee(amount: number): number {
    let fee = 0;

    if (amount > 40000000) {
      const firstSegmentAmount = Math.min(amount, 50000000);
      fee += Math.min(firstSegmentAmount * 0.05, 1500000);
      fee = Math.max(fee, 500000);
      amount -= firstSegmentAmount;
    }

    if (amount > 30000000 && amount <= 40000000) {
      const secondSegmentAmount = Math.min(amount, 40000000);
      fee += Math.min(secondSegmentAmount * 0.03, 1000000);
      fee = Math.max(fee, 500000);
      amount -= secondSegmentAmount;
    }

    if (amount <= 30000000) {
      const thirdSegmentAmount = amount;
      fee += Math.min(thirdSegmentAmount * 0.01, 200000);
      fee = Math.max(fee, 50000);
    }

    return fee;
    return fee;
  }
}
