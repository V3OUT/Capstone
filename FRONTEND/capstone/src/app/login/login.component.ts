import { Component } from '@angular/core';
import { User } from '../Model/user';
import { AuthserviceService } from '../services/authservice.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(private authservice: AuthserviceService, private router: Router) { }


  msg:string="";
  onLoginFormSubmit(userForm:NgForm)
  {
    const username = userForm.value.username;
    const password = userForm.value.password;
    
    const response = this.authservice.loginTheUser(username, password);

      if(response){ this.router.navigate(['/dashboard']);}
      else{this.msg="PLEASE CHECK YOUR CREDENTIALS";}

      
  }

}

