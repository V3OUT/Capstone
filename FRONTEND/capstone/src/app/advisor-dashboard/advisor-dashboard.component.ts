import { Component } from '@angular/core';
import { Customers } from '../Model/customers';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-advisor-dashboard',
  templateUrl: './advisor-dashboard.component.html',
  styleUrl: './advisor-dashboard.component.css'
})

  export class AdvisorDashboardComponent {
    availableServices: string[] = ['Oil Change', 'Tire Rotation', 'Brake Inspection'];
    selectedService: string = '';
    price: number = 0;
    selectedServices: string[] = [];
    prices: number[] = [];
    totalPrice: number = 0;
    customerID: string = '123'; // Replace with dynamic customer ID retrieval
    customerServiceMap: Map<string, { services: string[], prices: number[], totalPrice: number }> = new Map();
  
    addService() {
      if (this.selectedService && !this.selectedServices.includes(this.selectedService) && this.price > 0) {
        this.selectedServices.push(this.selectedService);
        this.prices.push(this.price);
        this.calculateTotalPrice();
      }
    }
  
    calculateTotalPrice() {
      this.totalPrice = this.prices.reduce((acc, price) => acc + price, 0);
    }
  
    saveServices() {
      const serviceData = {
        services: this.selectedServices,
        prices: this.prices,
        totalPrice: this.totalPrice
      };
      this.customerServiceMap.set(this.customerID, serviceData);
    }
  }
  