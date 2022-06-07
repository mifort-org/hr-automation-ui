import { Component, Input } from '@angular/core';
import { Candidate } from '@interfaces/candidates';

@Component({
  selector: 'app-candidate-item',
  templateUrl: './candidate-item.component.html',
})
export class CandidateItemComponent {
  @Input() candidate: Candidate | null = null;
}
