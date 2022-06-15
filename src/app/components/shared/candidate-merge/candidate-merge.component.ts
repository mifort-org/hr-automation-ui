import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-candidate-merge',
  templateUrl: './candidate-merge.component.html',
  styleUrls: ['./candidate-merge.component.scss'],
})
export class CandidateMergeComponent {
  @Input() candidateId!: string;

  @Input() candidateAttr: Array<string> = [];
}
