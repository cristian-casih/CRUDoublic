import { Component, OnInit } from '@angular/core';
import { PersonsService } from '../../services/persons.service';
import { PersonModel } from '../../models/person.model';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  persons: PersonModel[] = [];

  constructor(private personsService: PersonsService) { }
  
  ngOnInit() {

    this.personsService.getPersons()
      .subscribe(resp => {

        this.persons=resp
        console.log(this.persons);

      })
  }

}
