import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
  form = this.formBuilder.group({
    id: [0],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private service: UserService
  ) {}

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório!';
    }
    if (field?.hasError('email')) {
      return 'Email inválido!';
    }

    return 'Campo inválido!';
  }

  onCancel() {
    this.location.back();
  }

  onSave() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = this.form.value;
    this.service.createResource(user).subscribe(() => this.location.back());
  }
}
