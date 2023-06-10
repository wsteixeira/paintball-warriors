import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
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

  displayedColumns: string[] = [
    'select',
    'id',
    'firstName',
    'lastName',
    'email',
  ];
  dataSource: User[] = [];

  selection = new SelectionModel<User>(true, []);

  constructor(private service: UserService, private router: Router) {}

  ngOnInit(): void {
    this.service.getResources().subscribe((users) => (this.dataSource = users));
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

  onRemoveUser() {
    this.removeUsers(this.selection.selected);
  }

  removeUsers(users: User[]) {
    this.service.deleteResource(users[0].id).subscribe(() => {
      this.dataSource = this.dataSource.filter((user) => user != users[0]);
      users.shift();
      if (users.length) {
        this.removeUsers(users);
      } else {
        this.selection.clear();
        this.table.renderRows();
      }
    });
  }
}
