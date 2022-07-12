import { Component } from '@angular/core';
import { CandidateDetailService } from '@services/candidate-detail.service';

@Component({
  selector: 'app-candidate-communications',
  styleUrls: ['candidate-communications.scss'],
  templateUrl: './candidate-communications.component.html',
})
export class CandidateCommunicationsComponent {
  constructor(public candidateDetailService: CandidateDetailService) {}
}
