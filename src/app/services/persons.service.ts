import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PersonModel } from '../models/person.model';
import { map, delay, catchError } from 'rxjs/operators'
import { throwError, Observable } from 'rxjs';

/* import { catchError } from 'rxjs/operators'; */


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
        }),
        catchError(this.errorMgmt)
      );
  }

  updatePerson(person: PersonModel) {
    const personTemp = {
      name:person.name,
      lastname:person.lastname,
      sex:person.sex,
      email:person.email
    };
    //delete personTemp._id;
  
    console.log(personTemp, "aaa");


    return this.http.put(`${this.REST_API_SERVER}/person/${person._id}`, personTemp).pipe(
      catchError(this.errorMgmt)
    )
  }
  getPerson(id: string): Observable<any> {
    return this.http.get(`${this.REST_API_SERVER}/person/${id}`).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  getPersons(): Observable<any> {
    return this.http.get(`${this.REST_API_SERVER}/person`)
      .pipe(
        map(res => {
          return res
        }))
  }
  deletePerson(id: String) {
    //return this.http.delete(`${this.REST_API_SERVER}/person/${id}`)
    return this.http.delete(`${this.REST_API_SERVER}/person/${id}`).pipe(
      catchError(this.errorMgmt)
    )

  }
  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}