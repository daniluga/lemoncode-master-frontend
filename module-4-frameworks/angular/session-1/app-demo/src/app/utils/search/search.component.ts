// Estos son "decoradores" que se utilizan para definir metadatos para la clase de componente.
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input() placeholder = 'Search...';
  @Input() label = 'Search';

  name = 'Paco'

  /**
   * Output permite que el componente hijo emita eventos que pueden ser
   * escuchados por un componente padre. Es una forma de comunicación entre
   * componentes.
   */
  @Output() clickEnLupa: EventEmitter<string> = new EventEmitter();

  changeName() {
    this.name = 'Pepa'
    // console.log(`Buscando a... ${event.target.}`);
    this.clickEnLupa.emit(this.name);
  }
}
