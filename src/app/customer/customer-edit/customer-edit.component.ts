import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
})
export class CustomerEditComponent implements OnInit {
  title = 'Incluir Cliente';
  update = false;

  form = this.formBuilder.group({
    id: [0],
    name: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    federalId: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private service: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;

    if (id) {
      this.title = 'Editar Cliente';
      this.update = true;
      this.service
        .getResource(id)
        .subscribe((customer) => this.form.setValue(customer));
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
