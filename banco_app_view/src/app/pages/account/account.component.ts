import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Account } from 'src/assets/shared/models/account';
import { AccountService } from 'src/assets/shared/services/account.service';
import Swal from 'sweetalert2';
import { AccountListComponent } from './account-list/account-list.component';
import { CreateAccountComponent } from './create-account/create-account.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountArray: Account[] = [];
  @ViewChild(AccountListComponent) accountList: AccountListComponent = null;
  @ViewChild(CreateAccountComponent) createAcount: CreateAccountComponent = null;
  public onCreateAccount(_event: any) {
    this.createAccount(_event);
  }
  public onClickTransference(_event: any) {
    this.transferMoney(_event);
  }
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.currentAccounts();
  }

  currentAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (resp: Account[]) => {
        this.accountArray = resp
        this.accountList.accountArray = resp;
        this.createAcount.accountArray = resp;
      }
    });
  }

  createAccount(form: FormControl) {

    Swal.fire({
      title: '¿Seguro que quieres agregar esta cuenta?',
      text: "Confirme los datos antes de continuar",
      html: `
      <h5>Cédula: ${form['identification'].value}</h5>
      <h5>Nombre: ${form['full_name'].value}</h5>
      <h5>Saldo: ${form['account_balance'].value}</h5>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Creando cuenta...',
          html: '<h3>Espere un momento</h3>',
          showConfirmButton: false,
          willOpen() {
            Swal.showLoading();
          },
          didClose() {
            Swal.hideLoading();
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        });
        let data = {};
        Object.keys(form).forEach(control => {
          data[control] = form[control].value;
        });
        this.accountService.createAccount(data).subscribe({
          next: (resp: any) => {
            Swal.close();
            Swal.fire(
              'OK!',
              `${resp.success}`,
              'success'
            );
            this.createAcount.accountForm.reset();
          },
          error: (error) => {
            Swal.close();
            Swal.fire(
              'Ups!',
              `${error.error.error}`,
              'error'
            );
          },
          complete: () => {
            this.currentAccounts();
          }
        });
      }
    })

  }

  transferMoney(form: FormControl) {
    Swal.fire({
      title: 'Esta por realizar una transferencia',
      text: "Confirme los datos antes de continuar",
      html: `
      <h5>Origen: ${form['id_origin'].value}</h5>
      <h5>Destino: ${form['id_destination'].value}</h5>
      <h5>Valor: ${form['account_balance'].value}</h5>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Validando información...',
          html: '<h3>Espere un momento</h3>',
          showConfirmButton: false,
          willOpen() {
            Swal.showLoading();
          },
          didClose() {
            Swal.hideLoading();
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        });
        let data = {};
        Object.keys(form).forEach(control => {
          data[control] = form[control].value;
        });
        this.accountService.transferMoney(data).subscribe({
          next: (resp: any) => {
            Swal.close();
            Swal.fire(
              'OK!',
              `${resp.success}`,
              'success'
            );
            this.accountList.accountForm.reset();
          },
          error: (error) => {
            Swal.close();
            Swal.fire(
              'Ups!',
              `${error.error.error}`,
              'error'
            );
          },
          complete: () => {
            this.currentAccounts();
          }
        });
      }
    })

  }

}
