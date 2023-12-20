import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interface/User';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  //properties
  private user = new BehaviorSubject<User | undefined>(undefined);
  private linesCleared = new BehaviorSubject<number>(0);
  private difficultyLevel = new BehaviorSubject<number>(1);

  //getters & setters
  public setUser(user: User | undefined): void {
    this.user.next(user);
  }

  public getUser(): Observable<User | undefined> {
    return this.user.asObservable();
  }

  public setLinesCleared(linesCleared: number): void {
    this.linesCleared.next(linesCleared);
  }

  public getLinesCleared(): Observable<number> {
    return this.linesCleared.asObservable();
  }

  public setDifficultyLevel(difficultyLevel: number): void {
    this.difficultyLevel.next(difficultyLevel);
  }

  public getDifficultyLevel(): Observable<number> {
    return this.difficultyLevel.asObservable();
  }
}
