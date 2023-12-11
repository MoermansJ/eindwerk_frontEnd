import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interface/User';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  //properties
  private user = new BehaviorSubject<User | undefined>(undefined);

  //getters & setters
  public setUser(user: User | undefined): void {
    this.user.next(user);
  }

  public getUser(): Observable<User | undefined> {
    return this.user.asObservable();
  }
}
