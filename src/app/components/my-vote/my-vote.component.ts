import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService } from '../../services/timer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-vote',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './my-vote.component.html',
  styleUrl: './my-vote.component.scss'
})
export class MyVoteComponent {

  timerDisplay$ = this.timerService.timer$;

  constructor(private modalService: NgbModal,private timerService: TimerService) {
  }

  openModal(event: Event, content: any): void {
    event.preventDefault();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
  }
  
}
