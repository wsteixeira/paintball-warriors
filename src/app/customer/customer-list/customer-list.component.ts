import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';

import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'weight', 'symbol'];
  dataCustomers!: Customer[];
  dataSource: Customer[] = [];

  @ViewChild(MatTable) table!: MatTable<Customer>;

  constructor(private service: CustomerService) {}

  ngOnInit(): void {
    this.service.getResources().subscribe((customers: Customer[]) => {
      this.dataSource = customers;
      this.dataCustomers = customers;
    });
  }

  addData() {
    const randomElementIndex = Math.floor(
      Math.random() * this.dataCustomers.length
    );

    const customer: Customer = this.dataCustomers[randomElementIndex];
    customer.id = 0;
    this.service.createResource(customer).subscribe((resp) => {
      console.log(resp);
      this.dataSource.push(resp);
      this.table.renderRows();
    });
  }

  removeData() {
    this.service.removeResource(this.dataSource[0].id).subscribe(() => {
      this.dataSource.shift();
      this.table.renderRows();
    });
  }
}
