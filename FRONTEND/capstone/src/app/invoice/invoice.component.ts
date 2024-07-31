import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Invoices } from '../Model/invoices';
import { InvoicesService } from '../services/invoices.service';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoicesComponent implements OnInit {
  invoices: Invoices[] = [];
  selectedInvoice: Invoices | null = null;
  newInvoice: Invoices = { invoiceID: 0, serviceRecordID: 0, invoiceDate: new Date(), totalCost: 0 };

  constructor(private invoicesService: InvoicesService) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices(): void {
    this.invoicesService.getInvoices().subscribe(invoices => this.invoices = invoices);
  }

  selectInvoice(invoice: Invoices): void {
    this.selectedInvoice = { ...invoice }; // Create a copy of the selected invoice
  }

  createInvoice(): void {
    this.invoicesService.createInvoice(this.newInvoice).subscribe(invoice => {
      this.invoices.push(invoice);
      this.newInvoice = { invoiceID: 0, serviceRecordID: 0, invoiceDate: new Date(), totalCost: 0 };
    });
  }

  updateInvoice(): void {
    if (this.selectedInvoice) {
      const invoiceId = this.selectedInvoice.invoiceID;
      this.invoicesService.updateInvoice(invoiceId, this.selectedInvoice).subscribe(() => {
        const index = this.invoices.findIndex(i => i.invoiceID === invoiceId);
        if (index !== -1) {
          this.invoices[index] = { ...this.selectedInvoice! };
        }
        this.selectedInvoice = null;
      });
    }
  }

  deleteInvoice(invoiceID: number): void {
    this.invoicesService.deleteInvoice(invoiceID).subscribe(() => {
      this.invoices = this.invoices.filter(i => i.invoiceID !== invoiceID);
    });
  }

  clearSelection(): void {
    this.selectedInvoice = null;
  }
}