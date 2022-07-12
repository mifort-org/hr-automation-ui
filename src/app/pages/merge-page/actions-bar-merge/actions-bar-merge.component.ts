import { Component } from '@angular/core';
import { MergeService } from '@src/app/services/merge.service';

@Component({
  selector: 'app-actions-bar-merge',
  templateUrl: './actions-bar-merge.component.html',
  styleUrls: ['./actions-bar-merge.component.scss'],
})
export class ActionsBarMergeComponent {
  constructor(public mergeService: MergeService) {}
}
