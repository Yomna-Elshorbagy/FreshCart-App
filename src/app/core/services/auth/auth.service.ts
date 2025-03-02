import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../shared/enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  sendRegisterForm(data: object): Observable<any> {
    return this._httpClient.post(
      environments.baseUrl + `/api/v1/auth/signup`,
      data
    );
  }

  sendLoginForm(data: object): Observable<any> {
    return this._httpClient.post(
      environments.baseUrl + `/api/v1/auth/signin`,
      data
    );
  }

  setEmailVerify(data: object): Observable<any> {
    return this._httpClient.post(
      environments.baseUrl + `/api/v1/auth/forgotPasswords`,
      data
    );
  }

  setResetCode(data: object): Observable<any> {
    return this._httpClient.post(
      environments.baseUrl + `/api/v1/auth/verifyResetCode`,
      data
    );
  }

  setResetPassword(userEmail: string, userPassword: string): Observable<any> {
    return this._httpClient.put(
      environments.baseUrl + `/api/v1/auth/resetPassword`,
      {
        email: userEmail,
        newPassword: userPassword,
      }
    );
  }

  setChangePassword(data: object): Observable<any> {
    return this._httpClient.put(
      environments.baseUrl + `/api/v1/users/changeMyPassword`,
      data
    );
  }
}
