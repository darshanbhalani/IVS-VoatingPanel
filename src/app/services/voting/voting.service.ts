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

  validateVoter(data:any){
    return this.http.post(`${environment.apiBaseUrl}/MyVote/ValidateVoter`,data);
  }

  verifyVoter(data:any){
    return this.http.post(`${environment.apiBaseUrl}/MyVote/VerifyVoter`,data);
  }

  registerVote(data:any){
    return this.http.post(`${environment.apiBaseUrl}/MyVote/Vote`,data);
  }

  getCandidates(electionId:any,assemblyId:any){
    return this.http.get(`${environment.apiBaseUrl}/MyVote/GetCandidates?assemblyId=${assemblyId}&electionId=${electionId}`);
  }

}
