import { Component, ElementRef, ViewChild, inject, ɵConsole } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService } from '../../services/timer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, PatternValidator } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { VotingService } from '../../services/voting/voting.service';
import { HttpClient } from '@angular/common/http';
import { LabelModule } from '@progress/kendo-angular-label';
import { SwitchModule, InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonModule } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-my-vote',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GridModule,
    LabelModule,
    ButtonModule,
    InputsModule
  ],
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
  error:any; 
  otp:any; 
  selectedCandidateId:any;
  
  public form1: FormGroup = new FormGroup({
    voterId: new FormControl(null, [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
    voterPhoneNumber: new FormControl(null, [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
  });

  public form2: FormGroup = new FormGroup({
    otp1: new FormControl(null, [Validators.required, Validators.minLength(1),Validators.maxLength(1)]),
    otp2: new FormControl(null, [Validators.required, Validators.minLength(1),Validators.maxLength(1)]),
    otp3: new FormControl(null, [Validators.required, Validators.minLength(1),Validators.maxLength(1)]),
    otp4: new FormControl(null, [Validators.required, Validators.minLength(1),Validators.maxLength(1)]),
    otp5: new FormControl(null, [Validators.required, Validators.minLength(1),Validators.maxLength(1)]),
    otp6: new FormControl(null, [Validators.required, Validators.minLength(1),Validators.maxLength(1)]),
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
    if(this.form1.valid){
      const data={
        VoterId:this.form1.get('voterId')?.value!,
        VoterPhoneNumber:Number(this.form1.get('voterPhoneNumber')?.value!),
        ElectionId:1
      };
      this.votingService.validateVoter(data).subscribe((response:any) => {
        if(response.success){
            this.isOtpSended=true;
        }else{
          this.error = response.body.error;
        }
      });
    }
  }

  verifyOTP(event:any){
    event.preventDefault();
    if(this.form2.valid){
      const data={
        VoterId:this.form1.get('voterId')?.value!,
        VoterPhoneNumber:Number(this.form1.get('voterPhoneNumber')?.value!),
        ElectionId:1,
        Otp:this.otp
      };
      console.log(data)
      this.votingService.verifyVoter(data).subscribe((response:any) => {
        if(response.success){
          this.isVoterVerified=true;
        }else{
          this.error = response.body.error;
        }
      });
    }
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

   
      const otpValue = [
        this.otpInput1.nativeElement.value,
        this.otpInput2.nativeElement.value,
        this.otpInput3.nativeElement.value,
        this.otpInput4.nativeElement.value,
        this.otpInput5.nativeElement.value,
        this.otpInput6.nativeElement.value
      ].join('');
      alert(otpValue);
  }
}
