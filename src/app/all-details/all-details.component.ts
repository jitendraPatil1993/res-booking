import { Component, OnInit, Renderer2,ViewChild,ElementRef} from '@angular/core';
import html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-all-details',
  templateUrl: './all-details.component.html',
  styleUrl: './all-details.component.css'
})
export class AllDetailsComponent implements OnInit {
  @ViewChild('contentToExport') contentToExport !:ElementRef;

  customerData: any;
  reservationData: any;
  paymentData: any;

 
  constructor(private renderer: Renderer2) {}
  ngOnInit() {
  //  const body = document.body;
   // this.renderer.setStyle(body, 'overflow', 'scroll');

    //Optionally, add important styles on component initialization
 //  this.addImportantStyles();
    this.hideAllModalBackdrops();
    this.loadData();
  }

  // // Function to hide all modal backdrops directly
  hideAllModalBackdrops() {
    const backdrops = document.querySelectorAll('.modal-backdrop.show');
    backdrops.forEach((backdrop) => {
      this.renderer.setStyle(backdrop, 'opacity', '0');      
    });

    const position = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach((position) => {      
      this.renderer.setStyle(position, 'display', 'none');
    });
  }
  loadData() {
    this.customerData = this.getDataFromLocalStorage('customerData');
    this.reservationData = this.getDataFromLocalStorage('reservationData');
    this.paymentData = this.getDataFromLocalStorage('paymentData');
  }
   getDataFromLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  exportToPDF() {
    const element = this.contentToExport.nativeElement;

    // const options = {
    //   margin: [100, 10, 10, 10],
    //   filename: 'report.pdf',
    //   image: { type: 'jpeg', quality: 0.98 },
    //   html2canvas: { scale: 2 },
    //   jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    // };

    html2pdf().from(element).save().catch((error: any) => {
      console.error('Error generating PDF:', error);
    });
  }
}

