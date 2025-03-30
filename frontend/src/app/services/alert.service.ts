import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private messageSource = new BehaviorSubject<{ type: string, text: string } | null>(null);
  message$ = this.messageSource.asObservable();

  showMessage(type: 'success' | 'danger' | 'info' | 'warning', text: string) {
    this.messageSource.next({ type, text });

    setTimeout(() => this.clearMessage(), 2000);
  }

  clearMessage() {
    this.messageSource.next(null);
  }
}
