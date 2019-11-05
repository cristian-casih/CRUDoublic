import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonModel } from '../models/person.model';
import { map,delay } from 'rxjs/operators'
/* import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'; */


@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createPerson(person: PersonModel) {

    return this.http.post(`${this.REST_API_SERVER}/person`, person)
      .pipe(
        map((resp: any) => {
          person._id = resp._id;
          return person
        })
      );
  }
  updatePerson(person: PersonModel) {
    const personTemp = {
      ...person
    };
    console.log(personTemp,"aaa");
    
    delete personTemp._id;
 
    return this.http.put(`${this.REST_API_SERVER}/person/${person._id}`, personTemp)
  }
  getPerson(id:string){
    return this.http.get(`${this.REST_API_SERVER}/person/${id}`)
  }
  getPersons() {

    return this.http.get(`${this.REST_API_SERVER}/person`)
      .pipe(
        map(this.createArray),
        //el operador delay relentiza la respuesta en x cantidad de segundos
        delay(2000)
      );
  }
  private createArray(personObj: object) {
    const persons: PersonModel[] = [];

    if (personObj === null) {
      return [];
    } else {
      Object.keys(personObj).forEach(key => {
        const person: PersonModel = personObj[key];
        console.log(person, "peeee");
        persons.push(person)

      })
    }
    return persons
  }
  deletePerson(id:string){
    return this.http.delete(`${this.REST_API_SERVER}/person/${id}`)

  }

}