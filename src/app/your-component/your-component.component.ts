import { Component, OnInit,   } from '@angular/core';
import { YourService } from '../your-service.service';
import { ReservationService } from '../reservation.service';




@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html',
  styleUrls: ['./your-component.component.css']
})
export class YourComponent implements OnInit {
  data: any[] = [];
  filteredData: any[] = [];
  locationOptions: string[] = [];
  guestCapacityOptions: number[] = [];
  priceOptions: number[] = [];
  selectedLocation: string = '';
  selectedGuestCapacity: number | null = null;
  selectedPrice: number | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;
  info : any[]=[];

  constructor(
    private yourService: YourService,
    private reservationService: ReservationService,
   
    
  ) { }

  ngOnInit(): void {
    this.yourService.getUsers().subscribe(
      data => {
        this.data = data.map(item => ({
          ...item,
          guestCapacity: Number(item.guestCapacity),
          pricePerDayPerPerson: Number(item.pricePerDayPerPerson),
          stayDateFrom: new Date(item.stayDateFrom),
          stayDateTo: new Date(item.stayDateTo),
        }));
        this.locationOptions = [...new Set(data.map(item => item.locationName))];
        this.guestCapacityOptions = [...new Set(data.map(item => item.guestCapacity))].sort((a, b) => a - b);
        this.priceOptions = [...new Set(data.map(item => item.pricePerDayPerPerson))].sort((a, b) => a - b);
  
        this.filteredData = this.data;
  
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
    
  }

  onFilterChange(): void {
    const criteria = {
      locationName: this.selectedLocation,
      guestCapacity: this.selectedGuestCapacity,
      pricePerDayPerPerson: this.selectedPrice
    };
  
    const dateRange = {
      startDate: this.startDate ? new Date(this.startDate) : null,
      endDate: this.endDate ? new Date(this.endDate) : null
    };
  
    // Make sure this is not causing unintended mutations
    this.filteredData = this.yourService.filterData(this.data, criteria, dateRange);
    console.log('Filtered Data:', this.filteredData);
  }

  
  openModal(item: any) {   
     this.reservationService.setItem(item);  // Set the item in the service
   console.log( "setItem ", this.reservationService.setItem(item));
  }

  
 
  
 
  
  
}
