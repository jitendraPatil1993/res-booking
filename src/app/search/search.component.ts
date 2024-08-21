// import { Component } from '@angular/core';
// import { RoomService } from '../room.service';
// import { RoomAvail } from '../room-avail';
// import { RoomObject } from '../room-object';
// import { map } from 'rxjs';
// import { Room } from '../room';
// @Component({
//   selector: 'app-search',
//   templateUrl: './search.component.html',
//   styleUrl: './search.component.css'
// })
// export class SearchComponent {
//   combinedData: any[] = []; // Array to hold the combined data
//   data: RoomObject[] = [];
//   filteredData: RoomObject[] = [];
//   locationOptions: String[] = [];
//   guestCapacityOptions: number[] = [];
//   priceOptions: number[] = [];
//   selectedLocation: string = '';
//   selectedGuestCapacity: number | null = null;
//   selectedPrice: number | null = null;

//   constructor(public _roomservice: RoomService) { }  
//   ngOnInit(): void {
//     this.loadCombinedData();
//   }
//   loadCombinedData(): void {
//     this._roomservice.getUsers().subscribe(
//       data => {
//        // this.combinedData = data; // Store the combined data
//         this.data = data;
//         this.filteredData = data; // Initialize filtered data with all data
//        // this.locationOptions = [...new Set(data.map(item => item.locationName))]; // Extract unique location names
//         //this.guestCapacityOptions = [...new Set(data.map(item => item.guestCapacity))].sort((a, b) => a - b); // Extract unique guest capacities
//         //this.priceOptions = [...new Set(data.map(item => item.pricePerDayPerPerson))].sort((a, b) => a - b); // Extract unique prices
//       },
//       error => {
//         console.error('Error fetching data', error); // Handle errors
//       }
//     );
//   }

//   onFilterChange(): void {
//     const criteria = {
//       locationName: this.selectedLocation,
//       guestCapacity: this.selectedGuestCapacity,
//       pricePerDayPerPerson: this.selectedPrice
//     };

//     this.filteredData = this._roomservice.filterData(this.data, criteria);
//   }
// }
