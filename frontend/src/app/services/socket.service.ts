import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket = io('http://localhost:3000');

  onNotification(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('notification', (data: any) => {
        observer.next(data);
      });
    });
  }
}
