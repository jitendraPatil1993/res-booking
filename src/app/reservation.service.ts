import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private itemSource = new BehaviorSubject<any>(null);
  currentItem = this.itemSource.asObservable();

  setItem(item: any) {
    this.itemSource.next(item);
  }
}