import { Component, OnInit } from '@angular/core';
import { Workitems } from '../Model/workitems';
import { WorkitemsService } from '../services/workitems.service';
@Component({
  selector: 'app-workitems',
  templateUrl: './workitems.component.html',
  styleUrl: './workitems.component.css'
})

export class WorkitemsComponent implements OnInit {
  workItems: Workitems[] = [];
  currentItem: Workitems = {
    workItemID: 0,
    description: '',
    cost: 0
  };
  isEditing: boolean = false;

  constructor(private workitemsService: WorkitemsService) {}

  ngOnInit(): void {
    this.getWorkItems();
  }

  getWorkItems(): void {
    this.workitemsService.getWorkItems().subscribe(
      (data) => this.workItems = data,
      (error) => console.error('Error fetching work items:', error)
    );
  }

  viewItem(item: Workitems): void {
    this.currentItem = { ...item };
    this.isEditing = true;
  }

  createItem(): void {
    this.workitemsService.createitem(this.currentItem).subscribe(
      (data) => {
        this.workItems.push(data);
        this.resetForm();
      },
      (error) => console.error('Error creating work item:', error)
    );
  }

  updateItem(): void {
    if (!this.currentItem.workItemID) return;
    this.workitemsService.updateitem(this.currentItem.workItemID, this.currentItem).subscribe(
      () => {
        const index = this.workItems.findIndex(item => item.workItemID === this.currentItem.workItemID);
        if (index !== -1) {
          this.workItems[index] = this.currentItem;
          this.resetForm();
        }
      },
      (error) => console.error('Error updating work item:', error)
    );
  }

  deleteItem(id: number): void {
    this.workitemsService.deleteitem(id).subscribe(
      () => {
        this.workItems = this.workItems.filter(item => item.workItemID !== id);
      },
      (error) => console.error('Error deleting work item:', error)
    );
  }

  resetForm(): void {
    this.currentItem = {
      workItemID: 0,
      description: '',
      cost: 0
    };
    this.isEditing = false;
  }
}
