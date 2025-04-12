import { Component, inject, Signal, signal } from '@angular/core';
import { PersonService } from './person.service';
import { debounceTime, switchMap, tap } from 'rxjs';
import { Person } from './person';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [],
  template: `
    <input
      type="number"
      placeholder="Enter number of persons"
      (input)="updateNumberOfPersons($event)"
    />
    <ul>
      @for (person of persons(); track person.id) {
      <li>{{ person.name }}</li>
      }
    </ul>
    <div>
      <p>Number of persons: {{ numberOfPersons() }}</p>
    </div>
  `,
  styles: ``,
})
export class PersonsComponent {
  numberOfPersons = signal<number>(0);
  // persons: Person[] = [];

  private personService = inject(PersonService);

  updateNumberOfPersons($event: Event) {
    this.numberOfPersons.set(Number(($event.target as HTMLInputElement).value));
  }

  // e = effect(() => {
  //   this.personService
  //     .getPersons(this.numberOfPersons())
  //     .subscribe((persons) => {
  //       this.persons = persons;
  //     });
  // });

  persons = toSignal(
    toObservable(this.numberOfPersons).pipe(
      debounceTime(500),
      tap((t) => t),
      switchMap((numberOfPersons) =>
        this.personService.getPersons(numberOfPersons)
      ),
      tap((t) => t)
    )
  ) as Signal<Person[]>;
}
