import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  usernameOrEmail: string = '';
  password: string = '';
  role: string = 'Viewer';
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMessage = ''; 
    this.authService.login(this.usernameOrEmail, this.password, this.role)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('role', this.role);
          localStorage.setItem('username', this.usernameOrEmail);
          
          // Redirect and trigger UI update
          this.router.navigate(['/projects']).then(() => {
            window.location.reload(); // Ensures navbar updates instantly
          });
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'An unexpected error occurred';
        }
      });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
