import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  forgetPass: FormGroup = new FormGroup({
    email: new FormControl(null , [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ],),
  });
}
