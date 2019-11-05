import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonComponent } from './pages/person/person.component';
import { PersonsComponent } from './pages/persons/persons.component';

const routes: Routes = [
  { path: 'persons', component: PersonsComponent },
  { path: 'person/:id', component: PersonComponent },
  { path: '**', pathMatch: 'full', redirectTo:'persons' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
