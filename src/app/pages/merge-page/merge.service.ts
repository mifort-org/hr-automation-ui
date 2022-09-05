import { Injectable } from '@angular/core';
import { forkJoin, mergeMap, Observable, map, distinctUntilChanged, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash-es';
import { NotificationMode } from '@constants/notification';
import { CandidatesService } from '@services/candidates.service';
import { NotificationService } from '@services/notification.service';
import { MergeCandidate } from '@pages/merge-page/view-model/MergeCandidate';
import { MergeCandidateAttribute } from '@pages/merge-page/view-model/MergeCandidateAttribute';
import { Candidate } from '@src/app/models/candidate';
import { CandidateAttribute } from '@src/app/models/candidateAttribute';

@Injectable({
  providedIn: 'root',
})
export class MergeService {
  public candidatesIds$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
    'uliana_fomina',
    'artem_skrebets',
    'artem_skrebets',
  ]);

  private readonly candidates$: Observable<MergeCandidate[]>;

  constructor(
    private candidateService: CandidatesService,
    private notification: NotificationService
  ) {
    this.candidates$ = this.candidatesIds$.pipe(
      distinctUntilChanged(),
      mergeMap((candidatesIds) =>
        forkJoin(candidatesIds.map((id) => this.candidateService.getCandidateById(id)))
      ),
      map((candidates) => candidates.map((c) => this.candidateToMergeModel(c)))
    );
  }

  deleteCandidate(candidate: MergeCandidate) {
    this.candidatesIds$.next(this.candidatesIds$.getValue().filter((id) => id !== candidate.id));
  }

  mergeCandidates(): void {
    this.notification.show('Successfully merged. Check console', NotificationMode.SUCCESS);
  }

  getCandidates(): Observable<MergeCandidate[]> {
    return this.candidates$;
  }

  candidateToMergeModel(candidate: Candidate): MergeCandidate {
    const attributes = candidate.candidateAttributes.map((attr) =>
      this.attributeToMergeModel(candidate.id, attr)
    );
    return {
      ...candidate,
      attributes,
      attributesMap: new Map<string, MergeCandidateAttribute[]>(
        Object.entries(_.groupBy(attributes, (attr) => attr.attributeTypes.name))
      ),
    };
  }

  attributeToMergeModel(candidateId: string, attr: CandidateAttribute): MergeCandidateAttribute {
    return {
      ...attr,
      candidateId,
      selected: false,
    };
  }
}
