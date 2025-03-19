import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

type LoginType = 'student' | 'teacher';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginType: LoginType = 'student';

  private router = inject(Router);
  /**
   * ActivatedRoute: Proporciona acceso a información sobre una ruta asociada
   * con un componente que se carga en una salida de enrutador.
   */
  private route = inject(ActivatedRoute);

  onLoginSuccess() {
    console.log('Login Success');
    this.router.navigate(['/users']); // Navegar programáticamente a la ruta /users.
  }
  ngOnInit() {
    console.log('Login Component Initialized');
    /**
     * url?type="student"
     */
    this.route.queryParams.subscribe((params) => {
      console.log('Query Params:', params);
      this.loginType = params['type'];
    });
  }
}
