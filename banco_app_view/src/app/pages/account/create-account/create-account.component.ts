import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/assets/shared/models/account';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  accountForm: FormGroup;
  accountArray: Account[];
  @Output() public newAccountEvent = new EventEmitter<any>();
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.accountForm = this.formBuilder.group({
      identification: ['', [Validators.required]],
      full_name: ['', [Validators.required]],
      account_balance: ['', [Validators.required]]
    })
  }

}
