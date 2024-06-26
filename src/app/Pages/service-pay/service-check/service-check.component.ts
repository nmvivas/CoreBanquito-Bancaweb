import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTreeModule } from '@angular/material/tree';
import { Router, RouterOutlet } from '@angular/router';
import { SharedDataService } from '../../../services/payDetails.service';
import { DataSharingService } from '../../../services/accountDetails.service';
import { AccountTransactionDTO, sendTransaction } from '../../../services/transaction.service';
import { CompanyAccountsService } from '../../../services/companyAccounts.service';

@Component({
  selector: 'app-service-check',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatTreeModule],
  templateUrl: './service-check.component.html',
  styleUrls: ['./service-check.component.css'] // Corrected from 'styleUrl' to 'styleUrls' and made it an array
})
export class ServiceCheckComponent {
  company: any = {};
  contrapartida = '';
  deuda: number = 0;
  deudor = '';
  identificacion = '';
  dueDate = '';
  total: number = 0;
  comision: number = 0.40;
  iva: number = 0.15;
  idCompany: any = {} ;
  number = '';

  constructor(private router: Router, private sharedDataService: SharedDataService, private dataSharingService: DataSharingService, private companyAccountsService: CompanyAccountsService ) {
    this.company = this.sharedDataService.getSharedData().company;
    this.contrapartida = this.sharedDataService.getSharedData().contrapartida;
    this.deuda = this.sharedDataService.getSharedData().deuda;
    this.deudor = this.sharedDataService.getSharedData().debtorName;
    this.identificacion = this.sharedDataService.getSharedData().identificacion;
    this.dueDate = this.sharedDataService.getSharedData().dueDate;
    this.idCompany = this.sharedDataService.getSharedData().idCompany;
    this.number = this.dataSharingService.getAccountNumber();
  }

 

  ngOnInit() {
    this.calcularTotal(this.deuda);
    this.loadCompanyAccounts();
    console.log(this.idCompany);
  }

  loadCompanyAccounts() {
    const idCompany = this.sharedDataService.getSharedData().idCompany; 
    console.log(idCompany);
    this.companyAccountsService.getCompanyAccounts(idCompany).subscribe({
      next: (accounts) => {
        console.log(accounts); // Manejar la respuesta aquí
        
      },
      error: (error) => {
        console.error('Error fetching company accounts', error);
      }
    });
  }

  calcularTotal(deuda: number): void {
    this.total = parseFloat(((deuda + this.comision) * 1.15).toFixed(2));
    console.log(deuda);
    console.log(`${this.total} total`);
  }

  checkDebtAgainstBalance() {
    const accountBalance = parseFloat(this.dataSharingService.getAccountBalance()); // Convertir el saldo de la cuenta a número
    if (this.deuda > accountBalance) {
      alert('SALDO INSUFICIENTE' + this.deuda);
    }
  }

  prepareTransactionData(): AccountTransactionDTO {
    const transactionData: AccountTransactionDTO = {
      accountId: this.idCompany, 
      codeChannel: '0005', // Banca web 
      uniqueKey: '', 
      transactionType: 'DEB', 
      transactionSubtype: 'WITHDRAWAL', 
      reference: 'PAGO DE SERVICIO',
      ammount: this.deuda, 
      creditorAccount: '', 
      debitorAccount: this.number, 
    };
    return transactionData;
  }

  async onPayButtonClick() {
    const transactionData = this.prepareTransactionData();
    try {
      await sendTransaction(transactionData);
      // Navegar a service_successful si la transacción es exitosa
      this.router.navigate(['service_successful']);
    } catch (error) {
      console.error('La transacción falló', error);
      // Manejar el error, posiblemente mostrar un mensaje al usuario
    }
  }

  redirectToNext() {
    const accountBalance = parseFloat(this.dataSharingService.getAccountBalance()); // Convertir el saldo de la cuenta a número
    if (this.deuda <= accountBalance) {
      this.router.navigate(['service-successful']);
    } else {
      alert('SALDO INSUFICIENTE');
    }
  }

  redirectToCancel() {
    this.router.navigate(['dashboard']);
  }
}