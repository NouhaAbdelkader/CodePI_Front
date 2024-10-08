import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<string>(); // Subject to emit notifications

  constructor() {
    // Load notifications from localStorage on service initialization
    const storedNotificationsString = localStorage.getItem('notifications');
    if (storedNotificationsString) {
      try {
        const storedNotifications: string[] = JSON.parse(storedNotificationsString);
        storedNotifications.forEach(notification => {
          this.notificationSubject.next(notification);
        });
      } catch (error) {
        console.error('Error parsing stored notifications:', error);
      }
    } else {
      console.log('No stored notifications found.');
    }
  }

  // Method to subscribe to notifications
  getNotifications(): Observable<string> {
    return this.notificationSubject.asObservable();
  }

  // Method to send a notification
  sendNotification(message: string) {
    // Send notification to subscribers
    this.notificationSubject.next(message);
    
    // Load existing notifications from localStorage
    const storedNotificationsString = localStorage.getItem('notifications');
    let storedNotifications: string[] = storedNotificationsString ? JSON.parse(storedNotificationsString) : [];
  
    // Add the new notification to the existing notifications
    storedNotifications.push(message);
    
    // Store the updated notifications back to localStorage
    localStorage.setItem('notifications', JSON.stringify(storedNotifications));
  }
}