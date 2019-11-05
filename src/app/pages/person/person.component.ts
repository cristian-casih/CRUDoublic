import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { PersonModel } from '../../models/person.model';
import { PersonsService } from '../../services/persons.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person: PersonModel = new PersonModel();

  constructor(private personServices: PersonsService,
              private route:ActivatedRoute) { }

  ngOnInit() {

    const id= this.route.snapshot.paramMap.get('id');
    if(id!=='new'){

      this.personServices.getPerson(id)
        .subscribe((resp:PersonModel)=>{
          this.person=resp 
          this.person._id=id 
                            
        });
    }
    
  }
  save(form: NgForm) {

    if (form.invalid) {
      console.log('Form invalid');
      return;
    }

    Swal.fire({
      icon: 'info',
      title: 'Wait...',
      text: 'Saving information',
      allowOutsideClick: false
    });
    Swal.showLoading();
    let petition: Observable<any>;
    
    if (this.person._id) {
      petition = this.personServices.updatePerson(this.person)
    } else {
      petition = this.personServices.createPerson(this.person)
    }
    petition.subscribe(resp => {

      Swal.fire({
      icon: 'success',
      title: this.person.name,
      text: 'Person updated successfully',
    });
  });
  }

}

