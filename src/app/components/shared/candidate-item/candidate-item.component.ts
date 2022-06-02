import { Component, Input } from '@angular/core';
import { ICandidate } from '@interfaces/candidates';

@Component({
  selector: 'app-candidate-item',
  templateUrl: './candidate-item.component.html',
  styleUrls: ['./candidate-item.component.scss'],
})
export class CandidateItemComponent {
  @Input() candidate: ICandidate | null = null;
}
