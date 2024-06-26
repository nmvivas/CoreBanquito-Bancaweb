import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompanyAccountsService {
  private COMPANY_ACCOUNT_URL = environment.coreCobrosReceivablesApiUrl + '/accounts/company';

  constructor(private http: HttpClient) { }

  getCompanyAccounts(idCompany: string): Observable<any> {
    const url = `${this.COMPANY_ACCOUNT_URL}/${idCompany}`;
    return this.http.get(url);
  }
}