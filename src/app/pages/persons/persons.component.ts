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
  loading = false;

  constructor(private personsService: PersonsService) { }

  ngOnInit() {
    this.getPersons();
  }

  getPersons(){
    this.loading = true
    this.personsService.getPersons()
      .subscribe(resp => {
        this.persons = resp.person;
        this.loading = false;
      },error =>{
        console.log(JSON.stringify(error));
      });
  }
  
  deletePerson(person: PersonModel, i: number) {
    //console.log(person, "person.name")
    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      text: `Are you sure you want to delete ${person.name}`,
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.personsService.deletePerson(person._id).subscribe(resp=>{
          this.persons.slice(i, 1);
          this.getPersons();
        });
      }
    })


  }

}
