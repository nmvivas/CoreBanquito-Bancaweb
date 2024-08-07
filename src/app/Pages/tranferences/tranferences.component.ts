import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTreeModule } from '@angular/material/tree';
import { Router, RouterOutlet } from '@angular/router';
import { DataSharingService } from '../../services/accountDetails.service';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tranferences',
  standalone: true,
  imports: [RouterOutlet,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatTreeModule
  ],
  templateUrl: './tranferences.component.html',
  styleUrl: './tranferences.component.css'
})
export class TranferencesComponent implements OnInit {


  number = '';
  currentBalance = '';
  monto = '';
  beneficiario = '';
  cuenta = '';


  constructor(private dataSharingService: DataSharingService, private router: Router,     private accountService: AccountService, 
  ) { }

  ngOnInit(): void {
    this.number = this.dataSharingService.getAccountNumber();
    this.currentBalance = this.dataSharingService.getAccountBalance();
  }

  realizarTransferencia() {
    this.validarCuenta(this.cuenta).subscribe(
     
      (response) => {
        if (response && response.valid) {
          this.dataSharingService.setTransferenciaData({
            monto: this.monto,
            beneficiario: this.beneficiario,
            cuenta: this.cuenta
            
          });
          
          localStorage.setItem('beneficiario', this.beneficiario);
          localStorage.setItem('monto', this.monto);
          console.log(this.monto);
          localStorage.setItem('cuenta', this.cuenta);
          this.router.navigate(['tranferences-pago']);
        } else {
          alert('CUENTA INVALIDA');
        }
        console.log(this.cuenta);
      },
      (error) => {
        this.router.navigate(['tranferences-pago']);;
      }
    );
  }
  

  redirectToNext = () => {
  
  }
  redirectToCancel = () => {
    this.router.navigate(['dashboard']);

  }

  validarSaldo() {
    const montoNumerico = parseFloat(this.monto);
    const saldoActual = parseFloat(this.currentBalance);
    if (montoNumerico > saldoActual) {
      alert('SALDO INSUFICIENTE');
    }
  }

  validarCuenta(cuenta: string): Observable<any> {
    return this.accountService.getAccountValidation(cuenta);
  }
}

