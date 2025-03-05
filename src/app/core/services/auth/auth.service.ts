import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../shared/enviroments/enviroment';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../../../shared/interfaces/iuser';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}
  userData: IUser | null = {} as IUser;
  private readonly router = inject(Router);

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

  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.userData = null;
    this.router.navigate(['/login']);
  }
}
