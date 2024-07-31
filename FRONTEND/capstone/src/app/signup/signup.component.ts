import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../Model/user';
import { AuthserviceService } from '../services/authservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  msg:string="";
  constructor(private authservice:AuthserviceService,private router:Router) { }


  onRegistrationFormSubmit(userForm:NgForm){
    const user:User={
      username:userForm.value.username,
      useremail:userForm.value.useremail,
      userpassword:userForm.value.userpassword
    };
    const response=this.authservice.SignuptheUser(user);
    if(response)
      {this.router.navigate(['/login']);}
      else{this.msg='already created please login';}
  }
  userAlreadySignedUp(){
    this.router.navigate(['/login']);
  }
}