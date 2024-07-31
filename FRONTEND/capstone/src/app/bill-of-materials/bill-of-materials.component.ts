import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BillOfMaterialsService } from '../services/bill-of-materials.service';
import { BillOfMaterial } from '../Model/bill-of-material';

@Component({
  selector: 'app-bill-of-materials',
  templateUrl: './bill-of-materials.component.html',
  styleUrls: ['./bill-of-materials.component.css']
})
export class BillOfMaterialsComponent implements OnInit {
  bills: BillOfMaterial[] = [];
  selectedBill: BillOfMaterial | null = null;
  newBill: BillOfMaterial = { billOfMaterialID: 0, serviceRecordID: 0, workItemID: 0, quantity: 0 };

  constructor(private billOfMaterialsService: BillOfMaterialsService) { }

  ngOnInit(): void {
    this.getBills();
  }

  getBills(): void {
    this.billOfMaterialsService.getBill().subscribe(bills => this.bills = bills);
  }

  selectBill(bill: BillOfMaterial): void {
    this.selectedBill = { ...bill }; // Create a copy of the selected bill
  }

  createBill(): void {
    this.billOfMaterialsService.createBill(this.newBill).subscribe({
      next: bill => {
        this.bills.push(bill);
        this.newBill = { billOfMaterialID: 0, serviceRecordID: 0, workItemID: 0, quantity: 0 };
      },
      error: err => {
        console.error('Error creating bill:', err);
        alert('Error creating bill. Ensure all foreign key values are correct.');
      }
    });
  }

  updateBill(): void {
    if (this.selectedBill) {
      const billId = this.selectedBill.billOfMaterialID;
      this.billOfMaterialsService.updateBill(billId, this.selectedBill).subscribe({
        next: () => {
          const index = this.bills.findIndex(b => b.billOfMaterialID === billId);
          if (index !== -1) {
            this.bills[index] = { ...this.selectedBill! };
          }
          this.selectedBill = null;
        },
        error: err => {
          console.error('Error updating bill:', err);
          alert('Error updating bill. Ensure all foreign key values are correct.');
        }
      });
    }
  }
    
  

  deleteBill(billOfMaterialID: number): void {
    this.billOfMaterialsService.deleteBill(billOfMaterialID).subscribe(() => {
      this.bills = this.bills.filter(b => b.billOfMaterialID !== billOfMaterialID);
      if (this.selectedBill && this.selectedBill.billOfMaterialID === billOfMaterialID) {
        this.selectedBill = null;
      }
    });
  }

  clearSelection(): void {
    this.selectedBill = null;
  }
}
