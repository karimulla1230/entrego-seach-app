import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from './alert.service';

export class User{
  constructor(
    public status:string,
     ) {}
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient:HttpClient,
    private alertService:AlertService
  ) { 
     }

     authenticate(username, password) {
      return this.httpClient.post<any>('https://payments.entrego.org/v1/pod/auth', { username, password }).pipe(
       map(
         userData => {
          sessionStorage.setItem('username',username);
          localStorage.setItem('token',userData.token);
          return userData;
         }
       )
  
      );
    }
  

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
    localStorage.removeItem('token');
  }
}