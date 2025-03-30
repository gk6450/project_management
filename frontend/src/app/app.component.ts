import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SocketService } from './services/socket.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'project-management';
  username: string = '';
  isLoggedIn: boolean = false;
  notifications: any[] = [];
  showNotifications: boolean = false;
  alert: { type: string, text: string } | null = null;

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  constructor(private router: Router, private socketService: SocketService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.checkAuthStatus();
    this.socketService.onNotification().subscribe((data: any) => {
      data.read = false;
      this.notifications.unshift(data);
    });
    this.alertService.message$.subscribe(alert => {
      this.alert = alert;
    });
  }

  checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem('username') || '';

      if (this.router.url === '/login' || this.router.url === '/register') {
        this.router.navigate(['/projects']);
      }
    } else {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');

    this.isLoggedIn = false;
    this.username = '';

    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  markAsRead(notification: any) {
    notification.read = true;
  }

  dismissAlert() {
    this.alert = null;
  }
}
