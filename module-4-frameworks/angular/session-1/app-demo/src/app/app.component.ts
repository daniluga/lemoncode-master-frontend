import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { SearchComponent } from './utils/search/search.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { MenuComponent } from './menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    // RouterOutlet, SearchComponent,
    UserListComponent,
    MenuComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'My awsesome app';

  onClick($event: string) {
    console.log('Event emited from child: ' + $event);
  }
}
