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
  currentInvoice: Invoices | null = null;

  constructor(private invoicesService: InvoicesService) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices(): void {
    this.invoicesService.getInvoices().subscribe(
      (data) => this.invoices = data,
      (error) => console.error('Error fetching invoices:', error)
    );
  }

  viewInvoice(invoice: Invoices): void {
    this.currentInvoice = invoice;
  }

  closeInvoiceView(): void {
    this.currentInvoice = null;
  }
}
