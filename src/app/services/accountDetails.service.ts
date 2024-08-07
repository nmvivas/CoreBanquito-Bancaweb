import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private userNameSource = new BehaviorSubject<string>('');
  currentUserName = this.userNameSource.asObservable();

  private accountNumber: string = '';
  private accountBalance: string = '';
  private transferenciaData = { monto: '', beneficiario: '', cuenta: '' };


  constructor() {
    // Inicializar desde localStorage si existe
    this.accountNumber = localStorage.getItem('accountNumber') ?? '';
    this.accountBalance = localStorage.getItem('accountBalance') ?? '';
    this.transferenciaData.beneficiario = localStorage.getItem('beneficiario') ?? '';
    this.transferenciaData.monto = localStorage.getItem('monto') ?? '';
    this.transferenciaData.cuenta = localStorage.getItem('cuenta') ?? '';
  }

  setAccountDetails(number: string, balance: string) {
    this.accountNumber = number;
    this.accountBalance = balance;
    // Guardar en localStorage
    localStorage.setItem('accountNumber', number);
    localStorage.setItem('accountBalance', balance);
  }

  setUserName(userName: string) {
    this.userNameSource.next(userName);
  }

  getAccountNumber(): string {
    return this.accountNumber;
  }

  getAccountBalance(): string {
    return this.accountBalance;
  }

  setTransferenciaData(data: { monto: string; beneficiario: string; cuenta: string }) {
    this.transferenciaData.beneficiario = data.monto;
    this.transferenciaData.cuenta = data.cuenta;
    this.transferenciaData.beneficiario = data.beneficiario;
    localStorage.setItem('beneficiario', data.beneficiario);
    localStorage.setItem('monto', data.monto);
    localStorage.setItem('cuenta', data.cuenta);
  }

  getTransferenciaData() {
    return this.transferenciaData;
  }

}


