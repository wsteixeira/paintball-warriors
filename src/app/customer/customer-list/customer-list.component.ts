import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

import { MatTable } from '@angular/material/table';

import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Customer>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'select',
    'id',
    'name',
    'city',
    'state',
    'federalId',
    'email',
    'actions',
  ];

  dataSource!: Customer[];
  selection = new SelectionModel<Customer>(true, []);
  loading = false;

  showPageSizeOptions = true;
  pageSizeOptions = [5, 10, 25];

  constructor(private service: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.loadPage(1, this.pageSizeOptions[0]);
  }

  loadPage(page?: number, pageSize?: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = { page: page, pageSize: pageSize };

    this.loading = true;
    this.service.getResources(params).subscribe((resp) => {
      this.dataSource = resp.items;
      this.paginator.length = resp.total || 0;
      this.loading = false;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Customer): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  onAddCustomer() {
    this.router.navigate(['/customer/new']);
  }

  onEditCustomer(customer: Customer) {
    this.router.navigate([`/customer/edit/${customer.id}`]);
  }

  onRemoveCustomer(customer: Customer) {
    this.service.deleteResource(customer.id).subscribe(() => {
      this.dataSource = this.dataSource.filter((data) => data != customer);
      this.selection.clear();
      this.table.renderRows();
    });
  }

  onRemoveCustomers() {
    const customer: Customer = this.selection.selected[0];

    this.service.deleteResource(customer.id).subscribe(() => {
      this.dataSource = this.dataSource.filter((data) => data != customer);
      this.selection.selected.shift();
      if (this.selection.selected.length) {
        setTimeout(() => {
          this.onRemoveCustomers();
        }, 200);
      } else {
        this.selection.clear();
      }
    });
  }

  onPage() {
    this.loadPage(this.paginator.pageIndex + 1, this.paginator.pageSize);
  }
}
