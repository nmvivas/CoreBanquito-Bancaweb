import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClientService } from '../../services/client.service';
import { AccountService } from '../../services/account.service';
import { DataSharingService } from '../../services/accountDetails.service';
import { SessionService } from '../../services/session.Service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  codeInternalAccount = '';
  currentBalance = '';
  userName = '';

  constructor(
    private clientService: ClientService,
    private accountService: AccountService, 
    private sessionService: SessionService,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit(): void {
    const email = "braulio@gmail.com"
    if (email) {
      this.clientService.getClientIdByEmail(email).subscribe({
        next: (clientData) => {
          const clientId = clientData.uniqueId;
          console.log(clientId);
          console.log(clientData.fullName);
          this.dataSharingService.setUserName(clientData.fullName); 
          this.accountService.getAccountDetails(clientId).subscribe({
            next: (accountData) => {
              console.log(accountData.codeInternalAccount);
              console.log(accountData.availableBalance);
              this.currentBalance = accountData.availableBalance;
              this.codeInternalAccount = accountData.codeInternalAccount;
              this.dataSharingService.setAccountDetails(this.codeInternalAccount, this.currentBalance);

              // Guardar los detalles de la cuenta en el almacenamiento local
              localStorage.setItem('accountNumber', this.codeInternalAccount);
              localStorage.setItem('accountBalance', this.currentBalance);
              

              console.log(this.dataSharingService.getAccountNumber());
            },
            error: (error) => {
              console.error('Error fetching account details:', error);
            }
          });
        },
        error: (error) => {
          console.error('Error fetching client ID:', error);
        }
      });
    }
  }
}