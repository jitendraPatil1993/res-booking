import { Component, OnInit,ViewEncapsulation,Renderer2, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CustomerDetailsComponent implements OnInit {
  customerForm!: FormGroup;
  modalElement!: HTMLElement;

  constructor(private fb: FormBuilder,private renderer: Renderer2) {}

  ngOnInit(): void {
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
    
   
  }


  // injectCSS() {
  //   const style = document.createElement('style');
  //   style.type = 'text/css';
  //   style.innerHTML = '.modal-backdrop { display: block !important; }';
  //   document.head.appendChild(style);
  // }
  onSubmit() {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
      console.log(this.customerForm.value);
      const formData = this.customerForm.value;
      localStorage.setItem('customerData', JSON.stringify(formData));
      console.log('Form data saved to localStorage:', formData);
    } else {
      console.log('Form is invalid');
    }    
      this.showModal('paymentModal');
      this.hideModal('customerModal');    
  }

  // onSubmitCustomer() {
    
  //     this.showModal('paymentModal');
  //     this.hideModal('customerModal');
  //   //  this.injectCSS();
    
  // }
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
    // Cleanup logic here
    console.log('CustomerDetailsComponent destroyed');
    const backdrops = document.querySelectorAll('.modal-backdrop.show');
    backdrops.forEach((backdrop) => {
      this.renderer.setStyle(backdrop, 'opacity', '0');      
    });
  }
}