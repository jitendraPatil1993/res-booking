import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  reservationForm!: FormGroup;
  customerForm!: FormGroup;
  paymentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      reservationId: [null],
      locationId: [null, Validators.required],
      roomId: [null, Validators.required],
      customerId: [null, Validators.required],
      arrivalDate: [null, [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      departureDate: [null, [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      reservationDate: [null, [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)]],
      totalPrice: [null, Validators.required],
      status: ['CONFIRM', Validators.required],
      paidAmount: [null, Validators.required],
      numberOfGuest: [null, [Validators.required, Validators.min(1)]]
    });

    this.customerForm = this.fb.group({
      customerId: [null, Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      birthDate: [null, Validators.required],
      firstName: [null, Validators.required],
      middleName: [null],
      lastName: [null, Validators.required],
      country: [null, Validators.required],
      state: [null, Validators.required],
      city: [null, Validators.required],
      pinCode: [null, [Validators.required, Validators.min(100000), Validators.max(999999)]],
      initialAddress: [null, Validators.required],
      mobileNumber1: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      mobileNumber2: [null, [Validators.pattern(/^\d{10}$/)]]
    });

    this.paymentForm = this.fb.group({
      payment_mode: [null, Validators.required],
      paid_amount: [null, [Validators.required, Validators.min(0)]],
      due: [null, [Validators.required, Validators.min(0)]],
      amount: [null, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmitReservation() {
    if (this.reservationForm.valid) {
      // Show the customer modal
      this.showModal('customerModal');
    } else {
      console.error('Reservation form is invalid');
    }
  }

  onSubmitCustomer() {
    if (this.customerForm.valid) {
      // Show the payment modal
      this.showModal('paymentModal');
    } else {
      console.error('Customer form is invalid');
    }
  }

  onSubmitPayment() {
    if (this.paymentForm.valid) {
      // Hide all modals
      this.hideAllModals();
      // Handle final form submission, e.g., send data to server
    } else {
      console.error('Payment form is invalid');
    }
  }

  showModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  hideAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
      const bsModal = bootstrap.Modal.getInstance(modal);
      if (bsModal) {
        bsModal.hide();
      }
    });
  }
}