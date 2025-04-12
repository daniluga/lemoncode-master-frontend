import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { createPersons, Person } from './person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  /**
   * Permite tener en un componente un observable que emite un valor cada vez que
   * se actualiza el valor de la señal.
   */
  getPersons(numberOfPersons: number): Observable<Person[]> {
    /**
     * of() convierte un valor en un observable
     */
    return of(createPersons(numberOfPersons));
  }
}
