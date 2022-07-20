import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MergeService } from '@pages/merge-page/merge.service';
import { MergeCandidateAttribute } from '@pages/merge-page/view-model/MergeCandidateAttribute';

@Component({
  selector: 'app-merge-cell',
  templateUrl: './merge-cell.component.html',
  styleUrls: ['./merge-cell.component.scss'],
})
export class MergeCellComponent {
  constructor(public mergeService: MergeService) {}

  @Input() value?: MergeCandidateAttribute[];

  @Input() editable!: boolean;

  @Output() valueChange = new EventEmitter<boolean>();

  onCheckboxChange(item: MergeCandidateAttribute) {
    this.valueChange.emit(item.selected);
  }
}
