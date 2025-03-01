import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent {
  VerifyOtp: FormGroup = new FormGroup({
    resetCode: new FormControl(null , [
      Validators.required,
    ],),
  });
}
