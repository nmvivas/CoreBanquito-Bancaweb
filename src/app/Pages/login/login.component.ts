import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth.service';
import { SessionService } from '../../services/session.Service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  errorMessage: string = '';
  primeraVisita = true;
  accesoValidacion = false;

  constructor(private router: Router, private authenticationService: AuthenticationService,  private sessionService: SessionService) { }

  loginUser() {
    //this.authenticationService.login(this.userName, this.password).subscribe({
     /// next: (response) => {
        const response = { email: 'pbraulio@example.com' };
        console.log(response.email);
        this.router.navigate(["/dashboard"])
        //this.sessionService.setEmail(response.email); // Guarda el email en el servicio
        //this.router.navigate(["/dashboard"]).then();
      //},
      // alert("Credenciales incorrectas");
      // this.userName = '';
      // this.password = '';
      // error: (err) => {

      // }
   //});

  }
  register = () => {
    this.router.navigate(['register']);

  }
}



