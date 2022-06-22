import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MergeService } from '@src/app/services/merge.service';

@Component({
  selector: 'app-candidate-merge',
  templateUrl: './candidate-merge.component.html',
  styleUrls: ['./candidate-merge.component.scss'],
})
export class CandidateMergeComponent implements OnInit {
  constructor(public _mergeService: MergeService) {}

  @Input() candidateId!: string;

  @Input() index!: number;

  @Input() candidateAttr: Array<string> = [];

  @Output() changeAttributes = new EventEmitter<{
    candidateIndex: number;
    candidateAttr: Array<string>;
  }>();

  candidateAttrChecked: Array<string> = [];

  ngOnInit() {
    this.candidateAttrChecked = [...this.candidateAttr].fill('');
  }

  onCheckboxChange(event: any) {
    const index = event.target.value;
    this.candidateAttrChecked[index] = event.target.checked ? this.candidateAttr[index] : '';
    this.changeAttributes.emit({
      candidateIndex: this.index,
      candidateAttr: this.candidateAttrChecked,
    });
  }
}
