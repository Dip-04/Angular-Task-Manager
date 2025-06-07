import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms'; // <-- Import ReactiveFormsModule
import { AuthService } from '../../services/auth'; // Adjust path if necessary
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // For *ngFor and others

@Component({
  standalone: true, // <-- Add this
  selector: 'app-register',
  templateUrl: './register.html', // Or './register.component.html' if it's named like that
  imports: [
    ReactiveFormsModule, // <-- Add ReactiveFormsModule here
    CommonModule,        // <-- Add CommonModule here
    // If AuthService and Router are provided via app.config.ts, you don't need to import them here.
    // If you had any child standalone components or directives directly used in register.html, you'd list them here too.
  ]
})
export class RegisterComponent {
  form: FormGroup; // It's good practice to explicitly type 'form' as FormGroup

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.auth.register(this.form.value).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => alert(err.error.message)
    });
  }
}