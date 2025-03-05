import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  isLoading: boolean = false;
  msgError: string = '';
  isSucess: string = '';

  //using formGroup
  // loginForm: FormGroup = new FormGroup({
  //   email: new FormControl(null, [
  //     Validators.required,
  //     Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  //   ]),
  //   password: new FormControl(null, [
  //     Validators.required,
  //     Validators.pattern(/^[A-Z][\w!@#$%^&*()\-+=]{7,}$/),
  //   ]),
  // });

  //using formbuilder
  loginForm: FormGroup = this.formBuilder.group({
    email: [
      null,
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    password: [
      null,
      [
        Validators.required,
        Validators.pattern(/^[A-Z][\w!@#$%^&*()\-+=]{7,}$/),
      ],
    ],
  });

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          setTimeout(() => {
            //1-save token
            localStorage.setItem('userToken', res.token);
            //2-decode token
            this.authService.saveUserData();
            //3-navigate to home
            this.router.navigate(['/home']);
          }, 500);
          this.isSucess = res.message;
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          console.log(err);
          this.msgError = err.error.message;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
