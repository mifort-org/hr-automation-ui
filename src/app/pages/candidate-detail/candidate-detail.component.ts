import { Component } from '@angular/core';
import { CandidateDetailService } from '@services/candidate-detail.service';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss'],
  providers: [CandidateDetailService],
})
export class CandidateDetailComponent {
  constructor(public candidateDetailService: CandidateDetailService) {}
}
