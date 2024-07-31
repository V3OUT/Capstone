import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router: Router) { } 
  currentComponent: string = '';

  showComponent(component: string) {
    this.currentComponent = component;
  }
  isvehicleComponentVisible = false;
  iscustomercomponentvisible=false;
  toggleComponentvehicle() {
    this.isvehicleComponentVisible = !this.isvehicleComponentVisible;
}
isserviceComponentVisible = false;
toggleComponentservice() {
  this.isserviceComponentVisible = !this.isserviceComponentVisible;
}
toggleComponentcustomer() {
  this.iscustomercomponentvisible = !this.iscustomercomponentvisible;
}
logout() {
  localStorage.removeItem('user');
  this.router.navigate(['/login']);
}
}