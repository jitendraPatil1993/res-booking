import { Component, OnInit,ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';

import * as bootstrap from 'bootstrap'; // Import Bootstrap

@Component({
  selector: 'app-resort-detail',
  templateUrl: './resort-detail.component.html',
  styleUrls: ['./resort-detail.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ResortDetailComponent implements OnInit {
  reservationForm!: FormGroup;
  modalElement!: HTMLElement;
  item: any;
  currentDateTime  !: string ;
  

  constructor(private fb: FormBuilder, private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      reservationId: [null], // Auto-generated, set null or leave as is
      locationId: [{ disabled: true }, Validators.required],
      roomId: [{  disabled: true }, Validators.required],
      customerId: [ Validators.required],
      arrivalDate: [{ disabled: true }, Validators.required],
      departureDate: [{  disabled: true }, Validators.required],
      reservationDate: [{  disabled: true }, Validators.required],
      totalPrice: [{  disabled: true }, Validators.required],
      status: ['CONFIRM', Validators.required],
      paidAmount: ['', Validators.required],
      numberOfGuest: [{  disabled: true }, Validators.required]
    });

    this.reservationService.currentItem.subscribe(item => {
      this.item = item;
      this.setFormValues();
    });
  }

  setFormValues() {
    if (this.item) {
      this.reservationForm.patchValue({        
        locationId: this.item.locationId || '',
        roomId: this.item.roomId || '',
        arrivalDate: this.item.availability?.stayDateFrom || '',
        departureDate: this.item.availability?.stayDateTo || '',
        reservationDate: new Date().toISOString().slice(0, 16),
        totalPrice: this.item.guestCapacity * this.item.pricePerDayPerPerson || 0,
        numberOfGuest: this.item.guestCapacity || 0
      });
    }
  }
  
  generateRandomId() {
    return Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      // Set reservationId with a random number
      this.reservationForm.patchValue({
        reservationId: this.generateRandomId()
      });

      const formData = this.reservationForm.value;
      localStorage.setItem('reservationData', JSON.stringify(formData));
      console.log('Form data saved to localStorage:', formData);

      // Optionally, handle successful submission logic
      this.hideModal('reservationModal');
      this.showModal('customerModal');
    } else {
      console.log('Form is invalid');
    }
  }
  showModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  hideModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  ngOnDestroy() {
    console.log('ResortDetailsComponent destroyed');
  }
}
