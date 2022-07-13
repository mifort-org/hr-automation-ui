import { Component, Input } from '@angular/core';
import { Candidate } from '@src/app/models/candidates';

@Component({
  selector: 'app-candidate-item',
  templateUrl: './candidate-item.component.html',
})
export class CandidateItemComponent {
  @Input() candidate: Candidate | null = null;
}
