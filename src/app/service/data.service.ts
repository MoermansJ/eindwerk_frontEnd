import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interface/User';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  //properties
  private user = new BehaviorSubject<User | null>(null);

  //getters & setters
  public setUser(user: User | null): void {
    this.user.next(user);
  }

  public getUser(): Observable<User | null> {
    return this.user.asObservable();
  }
}
