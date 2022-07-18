import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MergeService } from '@pages/merge-page/merge.service';
import { MergeCandidate } from '@pages/merge-page/view-model/MergeCandidate';
import { CandidateAttributeType } from '@src/app/models/candidates';
import { MergeCandidateAttribute } from '@pages/merge-page/view-model/MergeCandidateAttribute';

@Component({
  selector: 'app-merge-candidate',
  templateUrl: './merge-candidate.component.html',
  styleUrls: ['./merge-candidate.component.scss'],
})
export class MergeCandidateComponent {
  constructor(public mergeService: MergeService) {}

  @Input() editable: boolean = true;

  @Input() candidate!: MergeCandidate;

  @Input() attributeTypes!: CandidateAttributeType[] | null;

  @Output() attributeSelectionChanged = new EventEmitter<MergeCandidateAttribute>();

  @Output() delete = new EventEmitter<void>();

  selectCandidate(value: MatCheckboxChange) {
    this.candidate.selected = value.checked;
    this.changeAttributeSelections(
      this.candidate.attributes.filter((a) => a.selected !== value.checked),
      value.checked
    );
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
  }

  deleteClick() {
    this.delete.emit();
  }
}
