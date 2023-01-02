import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MergeService } from '@pages/merge-page/merge.service';
import { MergeCandidate } from '@src/app/models/MergeCandidate';
import { MergeCandidateAttribute } from '@src/app/models/MergeCandidateAttribute';
import { CandidateAttributeType } from '@src/app/models/candidateAttributeType';

@Component({
  selector: 'app-merge-candidate',
  templateUrl: './merge-candidate.component.html',
  styleUrls: ['./merge-candidate.component.scss'],
})
export class MergeCandidateComponent {
  constructor(public mergeService: MergeService) {}

  checked = false;

  @Input() editable: boolean = true;

  @Input() candidates!: MergeCandidate[];

  @Input() candidate!: MergeCandidate;

  @Input() addCandidate: boolean = false;

  @Input() attributeTypes!: CandidateAttributeType[] | null;

  @Output() attributeSelectionChanged = new EventEmitter<MergeCandidateAttribute>();

  @Output() delete = new EventEmitter<void>();

  selectCandidate(value: MatCheckboxChange) {
    this.changeAttributeSelections(this.candidate.attributes, value.checked);
  }

  changeAttributeSelections(attrs?: MergeCandidateAttribute[], selected?: boolean) {
    if (!this.editable || !attrs) {
      return;
    }
    attrs.forEach((attr) => {
      // eslint-disable-next-line no-param-reassign
      attr.selected = selected === undefined ? attr.selected : selected;
      this.attributeSelectionChanged.emit(attr);
    });

    this.checked = this.candidate.attributes.every((attr) => attr.selected);
  }

  deleteClick() {
    this.delete.emit();
  }
}
