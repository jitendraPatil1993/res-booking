import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Room,Availability } from './room';

@Injectable({
  providedIn: 'root'
})
export class YourService {
  private roomUrl = 'https://jadhavsudhit.github.io/Booking-module/rooms.json';
  private stayUrl = 'https://jadhavsudhit.github.io/Booking-module/stays.json';

  
  constructor(private http: HttpClient) { }
  getUsers(): Observable<any[]> {
    const roomObjList$ = this.http.get<Room[]>(this.roomUrl);
    const roomAvail$ = this.http.get<Availability[]>(this.stayUrl);

    return forkJoin([roomObjList$, roomAvail$]).pipe(
      map(([roomObjList, roomAvail]) => {
        const roomMap = new Map<any, Room>();
        roomObjList.forEach(room => {
          roomMap.set(room.roomId, room);
        });

        const combinedData = roomAvail.map(avail => {
          const room = roomMap.get(avail.roomId) || { roomId: avail.roomId, roomName: '',  locationName: '', guestCapacity: 0, pricePerDayPerPerson: 0 }; // Default room object
          return {
            ...room,
            availability: avail
          };
        });

        return combinedData;
      })
    );
  }


  filterData(combinedData: any[], criteria: { [key: string]: any }, dateRange: { startDate: Date | null, endDate: Date | null }): any[] {
    return combinedData.filter(item => {
      // Check if item matches all criteria
      const matchesCriteria = Object.keys(criteria).every(key => {
        const criterion = criteria[key];
        if (criterion === undefined || criterion === null || criterion === '') {
          return true; // Skip filtering if criteria value is undefined, null, or empty string
        }
        if (typeof item[key] === 'number') {
          return item[key] === Number(criterion);
        }
        return item[key] === criterion;
      });
  
      // Check if item falls within the date range
      const itemStartDate = new Date(item.availability.stayDateFrom).getTime();
      const itemEndDate = new Date(item.availability.stayDateTo).getTime();
      const startDate = dateRange.startDate?.getTime();
      const endDate = dateRange.endDate?.getTime();
      console.log(itemStartDate, itemEndDate, startDate, endDate);
  
      const withinDateRange = (!startDate || itemStartDate >= startDate) ||
                              (!endDate || itemEndDate <= endDate);
  
      return matchesCriteria && withinDateRange;
    });
  }
}
