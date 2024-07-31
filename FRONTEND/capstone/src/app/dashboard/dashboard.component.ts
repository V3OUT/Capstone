import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router) {}
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


navigateToAdvisorDashboard() {
  this.router.navigate(['/advisordashboard']);
}

}