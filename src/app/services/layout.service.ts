import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router} from '@angular/router';
import { filter } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private pageNotFound = new BehaviorSubject<boolean>(false);
  pageNotFound$ = this.pageNotFound.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkPath();
    });
  }

  checkPath() {
    if(this.router.url === '/pagenotfound'){
      this.pageNotFound.next(true);
    }
  }
}
