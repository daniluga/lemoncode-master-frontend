import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from './product';
import { NormalComponent } from './normal.component';
import { SignalComponent } from './signal.component';
import { PersonsComponent } from './persons/persons.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NormalComponent,
    FormsModule,
    SignalComponent,
    PersonsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'signals-lab';
  quantity = signal(1); // writable signal, esto es
  qtyAvailable = signal([1, 2, 3, 4, 5, 6]);
  selectedProduct = signal<Product>({ id: 1, name: 'Foo', price: 12 });
  /**
   * computed signal, se ejecuta cada vez que alguna de las señales que dependen de él cambia
   * en este caso, cada vez que quantity o selectedProduct cambian, se recalcula el valor de exPrice
   */
  exPrice = computed(() => this.selectedProduct().price * this.quantity());
  color = computed(() => (this.exPrice() > 50 ? 'green' : 'blue'));

  constructor() {
    console.log(`signals value ${this.quantity}`); // comienza siendo 1
    effect(() => console.log('In effect: ', this.quantity())); // effect se ejecuta cada vez que el valor de la señal cambia
    this.quantity.update((q) => q * 2); // update signal value al construir el componente
  }

  onQuantitySelected($event: number): void {
    console.log('nQuantitySelected', $event);
    this.quantity.set($event);
    // this.quantity.set(67); // se lo salta porque signals sabe que va a volver a cambiar a 42, no es estable
    // this.quantity.set(42);
  }

  /**
   * ************************************************************
   */
}
