import { Component } from '@angular/core';
import { CandidateDetailService } from '@services/candidate-detail.service';

@Component({
  selector: 'app-candidate-main-info',
  styleUrls: ['candidate-main-info.component.scss'],
  templateUrl: './candidate-main-info.component.html',
})
export class CandidateMainInfoComponent {
  public displayedColumns: string[] = ['name', 'value'];

  constructor(public candidateDetailService: CandidateDetailService) {}
}
