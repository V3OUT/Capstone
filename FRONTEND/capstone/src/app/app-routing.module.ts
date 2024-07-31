import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthguardserviceService } from './services/authguardservice.service';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { CustomersComponent } from './customers/customers.component';
import { ServiceDoneComponent } from './servicedone/servicedone.component';
import { AdvisorDashboardComponent } from './advisor-dashboard/advisor-dashboard.component';
import { BillOfMaterialsComponent } from './bill-of-materials/bill-of-materials.component';
import { InvoicesComponent } from './invoice/invoice.component';
import { WorkitemsComponent } from './workitems/workitems.component';
const routes: Routes = [
  {path:'landing',component:LandingComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthguardserviceService]},
  {path:'vehicles',component:VehiclesComponent},
  {path:'customers',component:CustomersComponent},
  {path:'servicedone',component:ServiceDoneComponent},
  {path:'advisordashboard',component:AdvisorDashboardComponent},
  {path:'billofmaterials',component:BillOfMaterialsComponent},
  {path:'invoices',component:InvoicesComponent},
  {path:'workitems',component:WorkitemsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
