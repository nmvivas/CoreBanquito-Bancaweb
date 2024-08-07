import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private CLIENT_URL = environment.coreClientsApiUrl + '/clients/email/';

  constructor(private http: HttpClient) { }

  // Dentro de ClientService

  // getClientIdByEmail(email: string): Observable<any> {
  //   if (email === "nmvivas@gmail.com") {
  //     return of({ clientId: "2" });
  //   } else {
  //     return of({ error: "Email not found" }); // O usar throwError para simular un error
  //   }

  // }

  getClientIdByEmail(email: string): Observable<any> {
    email = "braulio@gmail.com";
    return this.http.get(`${this.CLIENT_URL}${email}`).pipe(
      catchError(error => {
        console.error('Error fetching client by email:', error);
        return throwError(() => error);
      })
    );
  }



  // getClientIdByEmail(email: string): Observable<any> {
  //   if (email === "braulio@gmail.com") {
  //     return of({ clientId: "3" }); // Devuelve un objeto específico para el correo braulio@gmail.com
  //   } else {
  //     return this.http.get(`${this.CLIENT_URL}${email}`).pipe(
  //       catchError(error => {
  //         console.error('Error fetching client by email:', error);
  //         return throwError(() => error);
  //       })
  //     );
  //   }
  // }

  async showClientByEmailInConsole(email: string): Promise<void> {
    this.getClientIdByEmail(email).pipe(
      catchError(error => {
        console.error('Error fetching client by email:', error);
        return throwError(() => error);
      })
    ).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching client data:', error);
      }
    });
  }


}
