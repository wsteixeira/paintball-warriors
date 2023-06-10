import { Injectable } from '@angular/core';
import { User } from './user.model';

const USER_DATA: User[] = [
  {
    id: 1,
    firstName: 'Paulo',
    lastName: 'Carvalho',
    email: 'paulo.carvalho@mail.com',
  },
  {
    id: 2,
    firstName: 'Maria',
    lastName: 'Soares',
    email: 'maria.soares@mail.com',
  },
  {
    id: 3,
    firstName: 'Pedro',
    lastName: 'Machado',
    email: 'pedro.machado@mail.com',
  },
  {
    id: 4,
    firstName: 'Sonia',
    lastName: 'Ferreira',
    email: 'sonia.ferreira@mail.com',
  },
  {
    id: 5,
    firstName: 'Carlos',
    lastName: 'Silva',
    email: 'carlos.silva@mail.com',
  },
  {
    id: 6,
    firstName: 'Silvia',
    lastName: 'Oliveira',
    email: 'silvia.oliveira@mail.com',
  },
  {
    id: 7,
    firstName: 'Elaine',
    lastName: 'Silverio',
    email: 'elaine.silverio@mail.com',
  },
  {
    id: 8,
    firstName: 'José',
    lastName: 'Teixeira',
    email: 'jose.teixeira@mail.com',
  },
  {
    id: 9,
    firstName: 'Marcio',
    lastName: 'Fonceca',
    email: 'marcio.fonceca@mail.com',
  },
  {
    id: 10,
    firstName: 'Viviane',
    lastName: 'Pereira',
    email: 'viviane.pereira@mail.com',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userData = [...USER_DATA];

  getResources(): User[] {
    return this.userData;
  }

  createResources(resource: User): User {
    this.userData.push(resource);
    return resource;
  }

  deleteResources(resource: User): User {
    this.userData = this.userData.filter((user) => user != resource);
    return resource;
  }
}
