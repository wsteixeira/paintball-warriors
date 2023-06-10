import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email'];
  dataInitial!: User[];
  dataSource!: User[];

  @ViewChild(MatTable) table!: MatTable<User>;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.dataInitial = this.service.getResources();
    this.dataSource = this.service.getResources();
  }

  addData() {
    const randomIndex = Math.floor(Math.random() * this.dataInitial.length);
    const newUser = this.service.createResources(this.dataInitial[randomIndex]);
    this.dataSource.push(newUser);
    this.table.renderRows();
  }

  removeData() {
    const user = this.dataSource[this.dataSource.length - 1];
    const delUser = this.service.deleteResources(user);
    this.dataSource = this.dataSource.filter((user) => user != delUser);
    this.table.renderRows();
  }
}
