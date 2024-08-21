import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,forkJoin } from 'rxjs';
import { Component,OnInit } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';
import { RoomAvail } from './room-avail';
import { RoomObject } from './room-object';
@Injectable({
  providedIn: 'root'
})
export class RoomService {

  // constructor(private http: HttpClient) { } 

  // roomListResult:any;
  // roomAvailResult:any;



  // getUsers():Observable<any>   {
  //   let roomObjList = this.http.get("https://jadhavsudhit.github.io/Booking-module/rooms.json"); // RoomObj
  //   let roomAvail = this.http.get("https://jadhavsudhit.github.io/Booking-module/stays.json"); // RoomAVail    
   

  //  return  forkJoin([roomObjList, roomAvail])
  //   we can use more that 2 api request 
           
           
    //}
    
    private roomUrl = 'https://jadhavsudhit.github.io/Booking-module/rooms.json';
    private stayUrl = 'https://jadhavsudhit.github.io/Booking-module/stays.json';
  
    constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    // Fetch both APIs
    const roomObjList$ = this.http.get<RoomObject[]>(this.roomUrl);
    const roomAvail$ = this.http.get<RoomAvail[]>(this.stayUrl);

    return forkJoin([roomObjList$, roomAvail$]).pipe(
      map(([roomObjList, roomAvail]) => {
        // Create a map for room details by roomId
        const roomMap = new Map<number, RoomObject>();
        roomObjList.forEach(room => {
          roomMap.set(room.roomId, room);
        });

        const combinedData = roomAvail.map(avail => {
          const room = roomMap.get(avail.roomId) || { roomId: avail.roomId, locationId:0, locationName: '', roomName: '', guestCapacity: 0, pricePerDayPerPerson: 0 }; // Default room object
          return {
            ...room,
            availability: avail
          };
        });

        return combinedData;
      })
    );
  }
  filterData(combinedData: any[], criteria: { [key: string]: any }): any[] {
    return combinedData.filter(item => {
      return Object.keys(criteria).every(key => {
        return criteria[key] === undefined || criteria[key] === item[key];
      });
    });
  }
}