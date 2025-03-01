import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss',
})
export class ResetpasswordComponent {
   resetPassword: FormGroup = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][\w!@#$%^&*()\-+=]{7,}$/),
      ]),
    });
}
