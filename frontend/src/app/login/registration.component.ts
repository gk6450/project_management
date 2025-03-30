import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RegistrationComponent {
  fullName: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {}

  register() {
    this.errorMessage = '';
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    this.authService.register(this.fullName, this.username, this.email, this.password, this.confirmPassword)
      .subscribe({
        next: (res: any) => {
          this.alertService.showMessage('success', 'Registration successful, please login');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'An unexpected error occurred';
        }
      });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
