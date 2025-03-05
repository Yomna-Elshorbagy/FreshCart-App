import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-resetpassword',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss',
})
export class ResetpasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  isLoading: boolean = false;
  msgError: string = '';
  isSucess: string = '';

  //using FormGroup
  // resetPassword: FormGroup = new FormGroup({
  //   email: new FormControl(null, [
  //     Validators.required,
  //     Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  //   ]),
  //   newPassword: new FormControl(null, [
  //     Validators.required,
  //     Validators.pattern(/^[A-Z][\w!@#$%^&*()\-+=]{7,}$/),
  //   ]),
  // });

  //using Formbuilder

  resetPassword: FormGroup = this.formBuilder.group({
    email: [
      null,
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    newPassword: [
      null,
      [
        Validators.required,
        Validators.pattern(/^[A-Z][\w!@#$%^&*()\-+=]{7,}$/),
      ],
    ],
  });

  submitForm(): void {
    if (this.resetPassword.valid) {
      this.isLoading = true;
      const { email, newPassword } = this.resetPassword.value;
      this.authService.setResetPassword(email, newPassword).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          setTimeout(() => {
            this.router.navigate(['/login']);
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
      this.resetPassword.markAllAsTouched();
    }
  }
}
