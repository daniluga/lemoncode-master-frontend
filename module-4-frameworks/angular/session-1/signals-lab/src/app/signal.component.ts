import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [],
  template: `
    <p>Hello from Signal Component: {{ fullName() }}</p>
    <p>{{ signalCounter }}</p>
    <button (click)="changeName()">Change Name</button>
  `,
  styles: ``,
})
export class SignalComponent {
  /**
   * writtable signals
   */
  firstName = signal('Bart');
  lastName = signal('Simpson');

  signalCounter = 0;

  /**
   * computed signal
   */
  fullName = computed(() => {
    this.signalCounter++;
    console.log('Signal name change');
    return `${this.firstName()} ${this.lastName()}`;
  });

  changeName(): void {
    this.firstName.set('El');
    this.lastName.set('Barto');
  }
}
