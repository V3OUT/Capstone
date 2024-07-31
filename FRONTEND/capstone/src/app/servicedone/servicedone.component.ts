import { Component, OnInit } from '@angular/core';
import { ServiceRecords } from '../Model/service-records';
import { ServiceRecordsService } from '../services/service-records.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-servicedone',
  templateUrl: './servicedone.component.html',
  styleUrls: ['./servicedone.component.css']
})
export class ServiceDoneComponent implements OnInit {
  servicesMap: Map<number, ServiceRecords> = new Map();
  serviceRecords: ServiceRecords[] = [];
  currentRecord: ServiceRecords = {
    serviceRecordID: 0,
    modelID: 0,
    ServiceRepresentativeID: 0,
    serviceDate: new Date(),
    status: '',
    vehicleID: 0 // Initialize vehicleID
  };
  isEditing: boolean = false;
  isFormVisible: boolean = false;

  constructor(private serviceRecordsService: ServiceRecordsService) {}

  ngOnInit(): void {
    this.getServiceRecords();
  }

  getServiceRecords(): void {
    this.serviceRecordsService.getServiceRecords().subscribe(
      (data) => this.serviceRecords = data,
      (error) => console.error('Error fetching service records:', error)
    );
  }

  viewRecord(record: ServiceRecords): void {
    this.currentRecord = { ...record };
    this.isEditing = true;
    this.isFormVisible = true;
  }

  addService(form: NgForm): void {
    const newService: ServiceRecords = {
      serviceRecordID: this.currentRecord.serviceRecordID,
      modelID: this.currentRecord.modelID,
      ServiceRepresentativeID: this.currentRecord.ServiceRepresentativeID,
      serviceDate: this.currentRecord.serviceDate,
      status: this.currentRecord.status,
      vehicleID: this.currentRecord.vehicleID // Ensure vehicleID is included
    };

    this.serviceRecordsService.createService(newService).subscribe({
      next: (createdService) => {
        this.serviceRecords.push(createdService);
        this.resetForm();
        form.resetForm();
        this.isFormVisible = false; // Hide form after adding
      },
      error: (error) => {
        console.error('Error adding service record:', error);
      }
    });
  }

  updateRecord(): void {
    if (!this.currentRecord.serviceRecordID) return;
    this.serviceRecordsService.updateService(this.currentRecord.serviceRecordID, this.currentRecord).subscribe(
      () => {
        const index = this.serviceRecords.findIndex(record => record.serviceRecordID === this.currentRecord.serviceRecordID);
        if (index !== -1) {
          this.serviceRecords[index] = this.currentRecord;
          this.resetForm();
        }
      },
      (error) => console.error('Error updating service record:', error)
    );
  }

  deleteRecord(id: number): void {
    this.serviceRecordsService.deleteService(id).subscribe(
      () => {
        this.serviceRecords = this.serviceRecords.filter(record => record.serviceRecordID !== id);
      },
      (error) => console.error('Error deleting service record:', error)
    );
  }

  resetForm(): void {
    this.currentRecord = {
      serviceRecordID: 0,
      modelID: 0,
      ServiceRepresentativeID: 0,
      serviceDate: new Date(),
      status: '',
      vehicleID: 0 // Reset vehicleID
    };
    this.isEditing = false;
    this.isFormVisible = false;
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.resetForm();
    }
  }
}
