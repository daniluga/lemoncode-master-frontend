import { RouterLink } from '@angular/router';
import { HighlightDirective } from '../directives/highlight.directive';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [HighlightDirective, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {}
