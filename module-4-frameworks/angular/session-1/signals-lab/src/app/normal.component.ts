import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, map, tap } from 'rxjs';

@Component({
  selector: 'app-normal',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <p>Hello from {{ fullName$ | async }}</p>
    <p>{{ fullNameCounter }}</p>
    <button (click)="changeName()">Change Name</button>
  `,
  styles: ``,
})
export class NormalComponent {
  /**
   * Dos observables que emiten el nombre y apellido de una persona
   */
  firstName = new BehaviorSubject<string>('Bart');
  lastName = new BehaviorSubject<string>('Simpson');

  fullNameCounter = 0;

  /**
   * Glitch effect es como un parpadeo en la pantalla que se produce cuando
   * se actualiza el valor de un observable
   */

  /**
   * ⚠️ El $ al final del nombre de la variable es una convención para indicar que
   * se trata de un observable.
   *
   * combineLatest combina los valores de los observables que recibe como argumento
   * y emite un nuevo valor cada vez que alguno de los observables emite un valor.
   *
   * tap() es un operador que permite ejecutar un efecto secundario cada vez que
   * el observable emite un valor.
   *
   * debounceTime(0) crea como un buffer que evita el glitch effect, haciendo que
   * sea sincrono el cambio de los valores de los observables.
   */
  public fullName$ = combineLatest([this.firstName, this.lastName]).pipe(
    debounceTime(0), // Evita el glitch effect y el contador va de 1 en 1 en vez de 2 en 2
    tap(() => this.fullNameCounter++),
    map(([firstName, lastName]) => `${firstName} ${lastName}`)
  );

  changeName(): void {
    this.firstName.next('El');
    this.lastName.next('Barto');
  }
}
