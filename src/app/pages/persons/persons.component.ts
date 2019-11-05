import { Component, OnInit } from '@angular/core';
import { PersonsService } from '../../services/persons.service';
import { PersonModel } from '../../models/person.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  persons: PersonModel[] = [];
  loading=false;

  constructor(private personsService: PersonsService) { }

  ngOnInit() {

    this.loading=true
    console.log(this.persons.length,"lengthhh");
    
    this.personsService.getPersons()
      .subscribe(resp => {
      this.persons = resp;
      this.loading=false;
    });
    }

  deletePerson(person: PersonModel, i: number) {
    console.log(person[i],"person.name")
    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      text: `Are you sure you want to delete ${person[i].name}`,
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.persons.slice(i, 1);
        this.personsService.deletePerson(person[i]._id).subscribe();
      }
    })


  }

}
