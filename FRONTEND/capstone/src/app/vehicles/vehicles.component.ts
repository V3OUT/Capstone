import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vehicles } from '../Model/vehicles';
import { VehiclesService } from '../services/vehicles.service';
import { CustomersService } from '../services/customers.service';
import { Customers } from '../Model/customers';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehiclesMap: Map<number, Vehicles> = new Map();
  selectedVehicle: Vehicles | null = null;
  customers: Customers[] = [];
  isUpdating: boolean = false;
  isAddVehicleFormVisible: boolean = false; // Track form visibility

  constructor(
    private vehicleServices: VehiclesService,
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
    this.loadCustomers();
  }

  loadVehicles(): void {
    this.vehicleServices.getVehicles().subscribe(data => {
      this.vehiclesMap.clear();
      data.forEach(vehicle => this.vehiclesMap.set(vehicle.modelId, vehicle));
    });
  }

  loadCustomers(): void {
    this.customersService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  addVehicle(form: NgForm): void {
    const newVehicle: Vehicles = {
      modelId: 0, // Placeholder; will be set by the server
      make: form.value.make,
      model: form.value.model,
      year: form.value.year,
      customerID: form.value.customerID
    };

    this.vehicleServices.addVehicle(newVehicle).subscribe({
      next: (vehicle) => {
        this.vehiclesMap.set(vehicle.modelId, vehicle);
        form.resetForm();
        this.isAddVehicleFormVisible = false; // Hide form after adding
      },
      error: (error) => {
        console.error('Error adding vehicle:', error);
      }
    });
  }

  updateVehicle(form: NgForm): void {
    if (this.selectedVehicle) {
      const updatedVehicle: Vehicles = {
        modelId: this.selectedVehicle.modelId,
        make: form.value.make,
        model: form.value.model,
        year: form.value.year,
        customerID: form.value.customerID
      };

      this.vehicleServices.updateVehicle(updatedVehicle.modelId, updatedVehicle).subscribe({
        next: (vehicle) => {
          this.vehiclesMap.set(vehicle.modelId, vehicle);
          form.resetForm();
          this.selectedVehicle = null;
          this.isUpdating = false;
          this.isAddVehicleFormVisible = false; // Hide form after updating
        },
        error: (error) => {
          console.error('Error updating vehicle:', error);
        }
      });
    }
  }

  deleteVehicle(modelId: number): void {
    this.vehicleServices.deleteVehicle(modelId).subscribe({
      next: () => {
        this.vehiclesMap.delete(modelId);
      },
      error: (error) => {
        console.error('Error deleting vehicle:', error);
      }
    });
  }

  showDetails(modelId: number): void {
    this.selectedVehicle = this.vehiclesMap.get(modelId) || null;
    this.isUpdating = true;
    this.isAddVehicleFormVisible = false; // Hide form when viewing details
  }

  clearDetails(): void {
    this.selectedVehicle = null;
    this.isUpdating = false;
  }

  toggleAddVehicleForm(): void {
    this.isAddVehicleFormVisible = !this.isAddVehicleFormVisible;
    this.isUpdating = false; // Hide form when toggling visibility
  }
}
