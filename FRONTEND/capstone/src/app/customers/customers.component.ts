import { Component, OnInit } from '@angular/core';
import { Customers } from '../Model/customers';
import { CustomersService } from '../services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customers[] = [];
  selectedCustomer: Customers | null = null;
  newCustomer: Customers = { customerID: 0, name: '', address: '', contactNumber: '' };
  isAddCustomerFormVisible: boolean = false; // Track form visibility

  constructor(private customersService: CustomersService) {}

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
      this.isAddCustomerFormVisible = false; // Hide form after adding
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

  toggleAddCustomerForm(): void {
    this.isAddCustomerFormVisible = !this.isAddCustomerFormVisible;
    this.selectedCustomer = null; // Clear selection when toggling visibility
  }
}
