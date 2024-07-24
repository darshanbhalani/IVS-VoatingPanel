import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService } from '../../services/timer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { VotingService } from '../../services/voting/voting.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-vote',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,GridModule],
  templateUrl: './my-vote.component.html',
  styleUrl: './my-vote.component.scss'
})
export class MyVoteComponent {
  @ViewChild('otpInput1') otpInput1!: ElementRef;
  @ViewChild('otpInput2') otpInput2!: ElementRef;
  @ViewChild('otpInput3') otpInput3!: ElementRef;
  @ViewChild('otpInput4') otpInput4!: ElementRef;
  @ViewChild('otpInput5') otpInput5!: ElementRef;
  @ViewChild('otpInput6') otpInput6!: ElementRef;

  electionList$=this.votingService.electionList$;

 data=[];
  isOtpSended = false;
  isVoterVerified = false;
  isVoted=false;
  selectedCandidateId:any;
  
  public form: FormGroup = new FormGroup({
    voterId: new FormControl(null, [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
    voterPhoneNumber: new FormControl(null, [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
  });

  constructor(
    private modalService: NgbModal,
    private votingService:VotingService
    ) {
  }

  ngOnInit(): void{
    this.votingService.getAllElections();
  }

  openModal(event: Event, content: any): void {
    event.preventDefault();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
  }

  sendOTP(event:any){
    event.preventDefault();
    this.isOtpSended=true;
  }

  verifyOTP(event:any){
    event.preventDefault();
    this.isVoterVerified=true;
  }

  recordVote(event:any){
    event.preventDefault();
    this.isVoted=true;
  }

  selectCandidate(id:any){
    this.selectedCandidateId=id;
  }

  onKeyUp(event: any, position: number) {
    const nextInput = event.target.nextElementSibling;
    if (nextInput && event.target.value) {
      nextInput.focus();
    }

    if (position === 6 && event.target.value) {
      const otpValue = [
        this.otpInput1.nativeElement.value,
        this.otpInput2.nativeElement.value,
        this.otpInput3.nativeElement.value,
        this.otpInput4.nativeElement.value,
        this.otpInput5.nativeElement.value,
        this.otpInput6.nativeElement.value
      ].join('');

      console.log('Entered OTP:', otpValue);
    }
  }
}
