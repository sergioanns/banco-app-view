import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/assets/shared/models/account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accountForm: FormGroup;
  accountArray: Account[] = [];
  p: number = 1;
  @Output() public transferenceEvent = new EventEmitter<any>();
  @Output() public onClickTransfer = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.accountForm = this.formBuilder.group({
      id_origin: ['', [Validators.required]],
      id_destination: ['', [Validators.required]],
      account_balance: ['', [Validators.required]]
    })
  }

  setControls(account) {
    this.accountForm.get('id_destination').setValue(account.identification);
  }

}
