import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../types/user.type';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject = new BehaviorSubject<User>({
    name: '',
    lastname: '',
    username: '',
    city: '',
    biography: '',
    email: '',
  });

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  loadUser() {
    try {
      const storedUser = localStorage.getItem('userProfile');
      const user = storedUser
        ? JSON.parse(storedUser)
        : { name: '', lastname: '', username: '', city: '', biography: '' };
      this.userSubject.next(user);
    } catch (err) {
      this.userSubject.next({
        name: '',
        lastname: '',
        username: '',
        city: '',
        biography: '',
        email: '',
      });
    }
  }

  saveUser(user: User) {
    localStorage.setItem('userProfile', JSON.stringify(user));
    this.userSubject.next(user);
  }
}
