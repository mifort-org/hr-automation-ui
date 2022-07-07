import { Component, OnInit } from '@angular/core';
import { MergeService } from '@src/app/services/merge.service';

@Component({
  selector: 'app-merge-page',
  templateUrl: './merge-page.component.html',
  styleUrls: ['./merge-page.component.scss'],
})
export class MergePageComponent implements OnInit {
  constructor(public mergeService: MergeService) {}

  candidateIds: Array<string> = [];

  finalResult: Array<Array<string>> = [];

  ngOnInit() {
    this.mergeService.candidatesIdsSubject$.subscribe((items) => {
      this.candidateIds = items;
    });
    this.mergeService.finalResultSubject$.subscribe((item) => {
      this.finalResult = item;
    });
    this.mergeService.parseCanditatesAttributes();
  }
}
