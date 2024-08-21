import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',  
})
export class LandingPageComponent {
   
  isOwnerClicked = false;
  isCustomerClicked = false;

  onOwnerClick() {
    this.isOwnerClicked = !this.isOwnerClicked;
  }

  onCustomerClick() {
    this.isCustomerClicked = !this.isCustomerClicked;
  }
}
