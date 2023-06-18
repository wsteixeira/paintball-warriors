import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  title = 'Incluir Usuário';
  update = false;
  loading = false;

  form = this.formBuilder.group({
    id: [0],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private service: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;

    if (id) {
      this.loading = true;
      this.title = 'Editar Usuário';
      this.update = true;
      this.service.getResource(id).subscribe((user) => {
        this.form.setValue(user);
        this.loading = false;
      });
    }
  }

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
    if (this.update) {
      this.service
        .updateResource(user.id, user)
        .subscribe(() => this.location.back());
    } else {
      this.service.createResource(user).subscribe(() => this.location.back());
    }
  }
}
