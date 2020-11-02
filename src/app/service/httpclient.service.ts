import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class TrackingOrderNumber {
  trackingNumber : String;
}

export class OrderDetails{

    public trackingNumber: String;
    public shipperReference: String;
    public status: String;
    public paymentReferenceNumber: String;
    public collectAmount : String;
    public updatedBy : String;
    
  
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

 

  constructor(
    private httpClient:HttpClient
  ) { 
     }

  public getOrderDetails(trackingNumber) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    return this.httpClient.get<OrderDetails>("https://payments.entrego.org/v1/pod/getOrderDetails?trackingNumber="+trackingNumber,{headers});
  }
}