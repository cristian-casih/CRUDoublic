import { Component, OnInit } from '@angular/core';
import { PersonModel } from '../../models/person.model';
import { NgForm } from '@angular/forms';
import { PersonsService } from '../../services/persons.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person: PersonModel = new PersonModel();

  constructor(private personServices: PersonsService) { }

  ngOnInit() {
  }

  save(form: NgForm) {

    if (form.invalid) {
      console.log('Form invalid');
      return;
    }
    if(this.person.id){
      this.personServices.updatePerson(this.person)
        .subscribe(resp=>{
          console.log(resp);
        });
    }else {
      this.personServices.createPerson(this.person)
        .subscribe(resp => {
          console.log(resp);
          this.person=resp;
        });
    }
  }


}
