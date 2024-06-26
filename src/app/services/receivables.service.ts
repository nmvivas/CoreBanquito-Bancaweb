import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReceivablesService {
  private COMPANY_URL: string = environment.coreCobrosReceivablesApiUrl + '/company/search';
  private ORDER_URL: string = environment.coreCobrosReceivablesApiUrl + '/order-items';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<any> {
    return this.http.get(this.COMPANY_URL);
  }

  getOrdersItems(counterpart: string, companyId: string): Observable<any> {
    // Asegurarse de que la URL base termine en '/search' antes de agregar '/by-counterpart'
    const baseUrl = this.ORDER_URL.endsWith('/search') ? this.ORDER_URL : `${this.ORDER_URL}/search`;
    const url = `${baseUrl}/by-counterpart?counterpart=${counterpart}&companyId=${companyId}`;
    return this.http.get(url);
  }
}