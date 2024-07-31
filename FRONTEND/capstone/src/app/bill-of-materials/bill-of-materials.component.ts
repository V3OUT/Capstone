import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BillOfMaterial } from '../Model/bill-of-material';
import { BillOfMaterialsService } from '../services/bill-of-materials.service';

@Component({
  selector: 'app-bill-of-materials',
  templateUrl: './bill-of-materials.component.html',
  styleUrls: ['./bill-of-materials.component.css']
})
export class BillOfMaterialsComponent implements OnInit {
  bills: BillOfMaterial[] = [];
  currentBill: BillOfMaterial = {
    billOfMaterialID: 0,
    serviceRecordID: 0,
    workItemID: 0,
    quantity: 0
  };
  isEditing: boolean = false;
  isFormVisible: boolean = false;
  errorMessage: string = '';

  constructor(private billOfMaterialsService: BillOfMaterialsService) {}

  ngOnInit(): void {
    this.getBills();
  }

  getBills(): void {
    this.billOfMaterialsService.getBill().subscribe(
      (data) => this.bills = data,
      (error) => console.error('Error fetching bills:', error)
    );
  }

  viewBill(bill: BillOfMaterial): void {
    this.currentBill = { ...bill };
    this.isEditing = true;
    this.isFormVisible = true;
  }

  validateForm(): boolean {
    if (this.currentBill.serviceRecordID <= 0 || this.currentBill.workItemID <= 0) {
      this.errorMessage = 'Service Record ID and Work Item ID must be positive numbers.';
      return false;
    }
    this.errorMessage = '';
    return true;
  }

  createBill(form: NgForm): void {
    if (!this.validateForm()) return;

    this.billOfMaterialsService.createBill(this.currentBill).subscribe(
      (createdBill) => {
        this.bills.push(createdBill);
        this.resetForm();
        form.resetForm();
        this.isFormVisible = false;
      },
      (error) => {
        console.error('Error creating bill:', error);
        this.errorMessage = 'Failed to create bill. Please check your inputs.';
      }
    );
  }

  updateBill(): void {
    if (!this.currentBill.billOfMaterialID || !this.validateForm()) return;

    this.billOfMaterialsService.updateBill(this.currentBill.billOfMaterialID, this.currentBill).subscribe(
      () => {
        const index = this.bills.findIndex(bill => bill.billOfMaterialID === this.currentBill.billOfMaterialID);
        if (index !== -1) {
          this.bills[index] = this.currentBill;
          this.resetForm();
        }
      },
      (error) => {
        console.error('Error updating bill:', error);
        this.errorMessage = 'Failed to update bill. Please check your inputs.';
      }
    );
  }

  deleteBill(id: number): void {
    this.billOfMaterialsService.deleteBill(id).subscribe(
      () => {
        this.bills = this.bills.filter(bill => bill.billOfMaterialID !== id);
      },
      (error) => {
        console.error('Error deleting bill:', error);
        this.errorMessage = 'Failed to delete bill. Please try again.';
      }
    );
  }

  resetForm(): void {
    this.currentBill = {
      billOfMaterialID: 0,
      serviceRecordID: 0,
      workItemID: 0,
      quantity: 0
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
