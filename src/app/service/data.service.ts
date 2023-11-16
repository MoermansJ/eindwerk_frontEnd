import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  //properties
  private user = new BehaviorSubject<string>('');

  //getters & setters
  public setUser(user: string): void {
    this.user.next(user);
  }

  public getUser(): Observable<string> {
    return this.user.asObservable();
  }
}
