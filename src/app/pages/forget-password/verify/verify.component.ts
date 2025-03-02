import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-verify',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    isLoading: boolean = false;
    msgError: string = '';
    isSucess: string = '';

  VerifyOtp: FormGroup = new FormGroup({
    resetCode: new FormControl(null , [
      Validators.required,
    ],),
  });

   submitForm(): void {
        if (this.VerifyOtp.valid) {
          this.isLoading = true;
    
          this.authService.setResetCode(this.VerifyOtp.value).subscribe({
            next: (res) => {
              console.log(res);
              this.isLoading = false;
              setTimeout(() => {
                this.router.navigate(['/resetPassword']);
              }, 500);
              this.isSucess = res.message;
            },
            error: (err: HttpErrorResponse) => {
              this.isLoading = false;
              console.log(err);
              this.msgError = err.error.message;
            },
          });
        }else {
          this.VerifyOtp.markAllAsTouched();
        }
      }
}
