import { Component, Input } from '@angular/core';
import { Candidate } from '@src/app/models/candidate';

@Component({
  selector: 'app-candidate-main-info',
  styleUrls: ['candidate-main-info.component.scss'],
  templateUrl: './candidate-main-info.component.html',
})
export class CandidateMainInfoComponent {
  @Input() public candidate!: Candidate;

  public displayedColumns: string[] = ['name', 'value'];
}
