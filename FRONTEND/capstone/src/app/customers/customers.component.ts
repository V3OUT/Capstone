import { Component } from '@angular/core';
import { Customers } from '../Model/customers';
import { NgForm } from '@angular/forms';
import { Vehicles } from '../Model/vehicles';
import { CustomersService } from '../services/customers.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  customers: Customers[] = [];
  selectedCustomer: Customers | null = null;
  newCustomer: Customers = { customerID: 0, name: '', address: '', contactNumber: '' };

  constructor(private customersService: CustomersService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customersService.getCustomers().subscribe(customers => this.customers = customers);
  }

  selectCustomer(customer: Customers): void {
    this.selectedCustomer = customer;
  }

  createCustomer(): void {
    this.customersService.createCustomer(this.newCustomer).subscribe(customer => {
      this.customers.push(customer);
      this.newCustomer = { customerID: 0, name: '', address: '', contactNumber: '' };
    });
  }

  updateCustomer(): void {
    if (this.selectedCustomer) {
      this.customersService.updateCustomer(this.selectedCustomer.customerID, this.selectedCustomer).subscribe(() => {
        this.selectedCustomer = null;
        this.getCustomers();
      });
    }
  }

  deleteCustomer(customerID: number): void {
    this.customersService.deleteCustomer(customerID).subscribe(() => {
      this.customers = this.customers.filter(c => c.customerID !== customerID);
    });
  }

  clearSelection(): void {
    this.selectedCustomer = null;
  }
}