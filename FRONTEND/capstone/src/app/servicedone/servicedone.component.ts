import { Component, OnInit } from '@angular/core';
import { ServiceRecords } from '../Model/service-records';
import { ServiceRecordsService } from '../services/service-records.service';
import { Vehicles } from '../Model/vehicles';
@Component({
  selector: 'app-servicedone',
  templateUrl: './servicedone.component.html',
  styleUrl: './servicedone.component.css'
})

export class ServiceDoneComponent implements OnInit {
  serviceRecords: ServiceRecords[] = [];
  currentRecord: ServiceRecords = {
    serviceRecordID: 0, // Change to number
    vehcileID: '',
    ServiceRepresentativeID: '',
    serviceDate: '',
    status: ''
  };
  isEditing: boolean = false;

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
  }

  createRecord(): void {
    this.serviceRecordsService.createService(this.currentRecord).subscribe(
      (data) => {
        this.serviceRecords.push(data);
        this.resetForm();
      },
      (error) => console.error('Error creating service record:', error)
    );
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

  deleteRecord(id: number): void { // Change id to number
    this.serviceRecordsService.deleteService(id).subscribe(
      () => {
        this.serviceRecords = this.serviceRecords.filter(record => record.serviceRecordID !== id);
      },
      (error) => console.error('Error deleting service record:', error)
    );
  }

  resetForm(): void {
    this.currentRecord = {
      serviceRecordID: 0, // Change to number
      vehcileID: '',
      ServiceRepresentativeID: '',
      serviceDate: '',
      status: ''
    };
    this.isEditing = false;
  }
}
