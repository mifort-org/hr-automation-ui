import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MergeService } from '@src/app/services/merge.service';

@Component({
  selector: 'app-candidate-merge',
  templateUrl: './candidate-merge.component.html',
  styleUrls: ['./candidate-merge.component.scss'],
})
export class CandidateMergeComponent {
  constructor(public mergeService: MergeService) {}

  // checked: boolean = false;
  @Input() checked: boolean = false;

  @Input() candidatesMatrixIndexes!: Array<number>;

  @Input() candidateAttr: string = '';

  @Output() changeAttributes = new EventEmitter<{
    candidatesMatrixIndexes: Array<number>;
    candidateAttr: string;
  }>();

  onCheckboxChange() {
    this.changeAttributes.emit({
      candidatesMatrixIndexes: this.candidatesMatrixIndexes,
      candidateAttr: this.checked ? this.candidateAttr : '',
    });
  }
}
