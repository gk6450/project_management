import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../env';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket = io(`${environment.BACKEND_URL}`);

  onNotification(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('notification', (data: any) => {
        observer.next(data);
      });
    });
  }
}
