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
  dataInitial: User[] = [];
  dataSource: User[] = [];

  @ViewChild(MatTable) table!: MatTable<User>;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.getResources().subscribe((users) => {
      this.dataInitial = users;
      this.dataSource = users;
    });
  }

  addData() {
    const randomIndex = Math.floor(Math.random() * this.dataInitial.length);
    const newUser = this.dataInitial[randomIndex];

    newUser.id = 0;
    this.service.createResource(newUser).subscribe((user) => {
      this.dataSource.push(user);
      this.table.renderRows();
    });
  }

  removeData() {
    const delData: User = this.dataSource[this.dataSource.length - 1];
    this.service.deleteResource(delData.id).subscribe((x) => {
      console.log(x);
      this.dataSource = this.dataSource.filter((user) => user != delData);
      this.table.renderRows();
    });
  }
}
