import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private url = environment.url;
 /*  headers: HttpHeaders; */
  constructor(private http: HttpClient) {
/*     this.headers = new HttpHeaders({
      namedb: this.namedb,
      'Content-Type': 'application/json',
      Authorization: this.token,
    }); */
  }

  getAccounts() {
    return this.http.get(`${this.url}/accounts`, { });
  }

  createAccount(data){
    return this.http.post(`${this.url}/accounts`, data);
  }

  transferMoney(data){
    return this.http.post(`${this.url}/transfer-money`, data);
  }

}
