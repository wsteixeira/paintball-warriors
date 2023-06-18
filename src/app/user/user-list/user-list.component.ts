import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';

import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'select',
    'id',
    'firstName',
    'lastName',
    'email',
    'actions',
  ];

  dataSource: User[] = [];
  loading = false;
  selection = new SelectionModel<User>(true, []);

  showPageSizeOptions = true;
  pageSizeOptions = [5, 10, 25];

  constructor(private service: UserService, private router: Router) {}

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
      console.log(this.loading);
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
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  onAddUser() {
    this.router.navigate(['/user/new']);
  }

  onEditUser(user: User) {
    this.router.navigate([`/user/edit/${user.id}`]);
  }

  onRemoveUser(user: User) {
    this.service.deleteResource(user.id).subscribe(() => {
      this.dataSource = this.dataSource.filter((data) => data != user);
      this.selection.clear();
      this.table.renderRows();
    });
  }

  onRemoveUsers() {
    const user: User = this.selection.selected[0];

    this.service.deleteResource(user.id).subscribe(() => {
      this.dataSource = this.dataSource.filter((data) => data != user);
      this.selection.selected.shift();
      if (this.selection.selected.length) {
        setTimeout(() => {
          this.onRemoveUsers();
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
