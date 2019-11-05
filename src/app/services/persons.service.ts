import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonModel } from '../models/person.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createPerson(person: PersonModel) {

    return this.http.post(`${this.url}/person`, person)
      .pipe(
        map((resp: any) => {
          person._id = resp._id;
          return person
        })
      );
  }
  updatePerson(person: PersonModel) {
    const personTemp={
      ...person
    };
    delete personTemp._id;

    return this.http.put(`${this.url}/person/${person._id}`, personTemp)
  }
}