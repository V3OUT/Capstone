import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { CustomersComponent } from './customers/customers.component';
import { ServiceDoneComponent } from './servicedone/servicedone.component';
import { AdvisorDashboardComponent } from './advisor-dashboard/advisor-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { BillOfMaterialsComponent } from './bill-of-materials/bill-of-materials.component';
import { InvoicesComponent } from './invoice/invoice.component';
import { WorkitemsComponent } from './workitems/workitems.component';
import { LogoutComponent } from './logout/logout.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    VehiclesComponent,
    CustomersComponent,
    ServiceDoneComponent,
    AdvisorDashboardComponent,
    BillOfMaterialsComponent,
    InvoicesComponent,
    WorkitemsComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
