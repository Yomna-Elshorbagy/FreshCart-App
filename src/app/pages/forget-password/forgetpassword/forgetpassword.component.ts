import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule,FormsModule, ],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading: boolean = false;
  msgError: string = '';
  isSucess: string = '';

  forgetPass: FormGroup = new FormGroup({
    email: new FormControl(null , [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ],),
  });
  
    submitForm(): void {
      if (this.forgetPass.valid) {
        this.isLoading = true;
  
        this.authService.setEmailVerify(this.forgetPass.value).subscribe({
          next: (res) => {
            console.log(res);
            this.isLoading = false;
            setTimeout(() => {
              this.router.navigate(['/verify']);
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
        this.forgetPass.markAllAsTouched();
      }
    }
}
