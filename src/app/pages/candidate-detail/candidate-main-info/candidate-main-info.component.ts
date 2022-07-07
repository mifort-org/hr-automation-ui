import { Component, Input } from '@angular/core';
import { CandidateAttributesValues } from '@interfaces/candidates';

@Component({
  selector: 'app-candidate-main-info',
  styleUrls: ['candidate-main-info.component.scss'],
  templateUrl: './candidate-main-info.component.html',
})
export class CandidateMainInfoComponent {
  @Input() candidateAttributesValues!: CandidateAttributesValues[] | null;

  displayedColumns: string[] = ['name', 'value'];
}
