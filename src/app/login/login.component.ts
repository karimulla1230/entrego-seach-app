import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../service/alert.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  invalidCred = false;
  invalidLogin = false
  usercontrol: FormControl;
  passcontrol: FormControl;
  submitted = false;
  loading = false;
  returnUrl: String;
  errorCheck  =  false;


  constructor(
    private router: Router,
    private loginservice: AuthenticationService,
    private alertService: AlertService,
    private route: ActivatedRoute) 
    { 
             //redirect to home, if already loggedIn
              if(this.loginservice.isUserLoggedIn){
                this.router.navigate[("/")];
              }
              
            
    }
  ngOnInit() {
    if(this.router.url == "/login"){
      sessionStorage.clear();
      localStorage.clear();
      this.router.navigate(["/login"])
   }
    this.usercontrol = new FormControl('', [Validators.required,Validators.maxLength(10)]);
    this.passcontrol = new FormControl('', [Validators.required,Validators.maxLength(10)]);
    //get returnUrl from route params or defaul to "/"
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  messageValidation(errorCheck){
     if(errorCheck){
        return;
     }
  }

  checkLogin(event: any) {
     this.submitted = true;
      if(this.username == '' && this.password ==  ''){
        return this.messageValidation(true)
      } else if(this.username !='' && this.password == '') {
        return this.messageValidation(true)
      } else if(this.password != '' && this.username =='')  {
        return this.messageValidation(true)
      }
      this.loading = true;
    (this.loginservice.authenticate(this.username,this.password).subscribe(
      data => {
        this.router.navigate(['/orderTracking']);
        this.invalidLogin = false
      }, error =>{
        this.alertService.error(error);
        alert('incorrect credentials/ network issue')
        this.loading = false;
        this.invalidCred = true;
        this.router.navigate(["/login"]);
      })
    );

  }

}