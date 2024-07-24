import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  private electionList = new BehaviorSubject<any>(false);
  electionList$ = this.electionList.asObservable();

  constructor(private http:HttpClient) { }

  getAllElections(){
     this.http.get(`${environment.apiBaseUrl}/MyVote/GetAllElections`).subscribe((response:any) => {
        if(response.success){
          console.log(response.body);
          this.electionList.next(response.body.data);
        }
    });
  }
}
