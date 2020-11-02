import { Component, OnInit } from '@angular/core';
import { HttpClientService, OrderDetails,TrackingOrderNumber } from '../service/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../service/alert.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {

  rowData:any;
  orderDetails: OrderDetails;
  trackingCtrl: FormControl;
  submitted = false;
  isValidation = false;
  trackingNumber: TrackingOrderNumber = new TrackingOrderNumber;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClientService: HttpClientService,
    private alertService: AlertService
    
  ) { }

  ngOnInit() {
       this.orderDetails =null;
       this.trackingCtrl = new FormControl('', [Validators.required]);
       if(this.router.url == "/login"){
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(["/login"])
       }
  }

   trackingValidation(isValidation){ 
          if(isValidation){
              return;
          }
   }

  getOrderDetails(event: any): any {
    this.submitted =true;
    if(this.trackingNumber.trackingNumber == null){
        return this.trackingValidation(true);
    }
    this.httpClientService.getOrderDetails(this.trackingNumber.trackingNumber)
        .subscribe( response => { 
             this.trackingNumber.trackingNumber='';
             this.handleSuccessResp(response);
             this.isValidation = false;
             this.submitted = false;
             
             this.router.navigate(['/orderTracking'])
        }, error => {
           this.alertService.error(error);
           this.orderDetails =null,
           alert("incorrect tracking number");
           this.isValidation = true;
           this.trackingNumber.trackingNumber ='';
           this.router.navigate(['/orderTracking']);
           
        });

  };
  handleSuccessResp(response)
  {
      this.orderDetails=response;
  }
}