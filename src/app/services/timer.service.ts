import { Injectable } from '@angular/core';
import {BehaviorSubject, Subscription ,interval} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private timer = new BehaviorSubject<string>("");
  timer$ = this.timer.asObservable();


  interval: any;
  timerDisplay: string = "";
  endTime: number = 0;

  constructor() {
  }

  startTimer(): void {
    const endTime = new Date('2024-12-31T23:59:59').getTime();
    this.interval = setInterval(() => this.updateTimer(), 1000);
  }

  updateTimer(): void {
    const now = new Date().getTime();
    const timeRemaining = this.endTime - now;

    if (timeRemaining <= 0) {
      this.timer.next("Time's up!");
      return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    this.timer.next(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    console.log(this.timer);
  }
}
