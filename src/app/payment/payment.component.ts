import { Component, OnInit,Renderer2 ,ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Modal} from 'bootstrap';
import * as bootstrap from 'bootstrap';

import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class PaymentComponent {
  paymentForm !: FormGroup;
  modalElement: any;

  constructor(private fb: FormBuilder, private renderer: Renderer2,private router: Router) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      payment_mode: [null, Validators.required],
      paid_amount: [null, [Validators.required, Validators.min(0)]],
      due: [null, [Validators.required, Validators.min(0)]],
      amount: [null, [Validators.required, Validators.min(0)]]
    });

    // Initialize the modal
    this.modalElement = document.getElementById('paymentModal');
    if (this.modalElement) {
      new Modal(this.modalElement);
    }

  
  }
  injectCSS() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.modal-backdrop { display: block !important; }';
    document.head.appendChild(style);
  }
  
  onSubmit() {
    
   
    if (this.paymentForm.valid) {
      
      const formData = this.paymentForm.value;
      localStorage.setItem('paymentData', JSON.stringify(formData));
      console.log('Form data saved to localStorage:', formData);
    } else {
      console.log('Form is invalid');
    }
      
      this.router.navigate(['reservation/allDetails']); 
      // Close the modal programmatically
      if (this.modalElement) {
        const modal = Modal.getInstance(this.modalElement);
        modal?.hide();
      }
      else {
      console.error('Form is invalid');
    }
    debugger;
   // this.injectCSS();
   // this.hideAllModals();
  }

 
  hideModal(modalId: any) {
    debugger;
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
  // hideAllModals() {
  //   debugger;
  //   document.querySelectorAll('.modal').forEach(modal => {
  //     const bsModal = bootstrap.Modal.getInstance(modal);
  //     if (bsModal) {
  //       bsModal.hide();
  //     }
  //   });
  // }
  ngOnDestroy() {
    // Cleanup logic here
    console.log('PaymentComponent destroyed');
  }
 
  
}
