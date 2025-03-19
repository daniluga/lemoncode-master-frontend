import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  /**
   * Con esto así, el color es un atributo de entrada, es decir, se puede 
   * pasar como atributo en el HTML. Así lo hacemos reutilizable.
   * 
   * Se puede inicializar el color aquí.
   */
  @Input('appHighlight')
  color!: string; // Se inicializa como undefined.

  private defaultColor = 'lightgreen' // Si no se pasa color, se pone este por defecto.

  private element: ElementRef;
  constructor(el: ElementRef) {
    this.element = el;
  }

  private highlight(color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }

  @HostListener('mouseenter')
  // Estos nombres de funciones son arbitrarios, pero es una buena práctica nombrarlos de manera descriptiva
  onMouseEnter() {
    console.log('mouse enter');
    this.highlight(this.color || this.defaultColor);
  }

  @HostListener('mouseleave')
  // Estos nombres de funciones son arbitrarios, pero es una buena práctica nombrarlos de manera descriptiva
  onLeave() {
    console.log('mouse leave');
    this.highlight('');
  }
}
