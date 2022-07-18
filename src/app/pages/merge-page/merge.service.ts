/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { forkJoin, mergeMap, Observable, Subject, map, distinctUntilChanged } from 'rxjs';
import { ENotificationMode } from '@constants/notification';
import { CandidatesService } from '@services/candidates.service';
import { NotificationService } from '@services/notification.service';
import { MergeCandidate } from '@pages/merge-page/view-model/MergeCandidate';
import { Candidate, CandidateAttribute } from '@src/app/models/candidates';
import { MergeCandidateAttribute } from '@pages/merge-page/view-model/MergeCandidateAttribute';

@Injectable({
  providedIn: 'root',
})
export class MergeService {
  private readonly candidatesIds$: Subject<string[]> = new Subject<string[]>();

  private readonly candidates$: Observable<MergeCandidate[]>;

  constructor(
    private candidateService: CandidatesService,
    private notification: NotificationService
  ) {
    console.log('MergeService.constructor');
    this.candidates$ = this.candidatesIds$.pipe(
      distinctUntilChanged(),
      mergeMap((candidatesIds) =>
        forkJoin(candidatesIds.map((id) => this.candidateService.getCandidateById(id)))
      ),
      map((candidates) => candidates.map((c) => this.candidateToMergeModel(c)))
    );
  }

  updateCandidates(ids: string[]) {
    console.log('MergeService.updateCandidates', ids);
    this.candidatesIds$.next(ids);
  }

  mergeCandidates(): void {
    this.notification.show('Successfully merged. Check console', ENotificationMode.SUCCESS);
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
      selected: false,
      attributes,
      attributesMap: attributes.reduce((resMap, attr) => {
        // TODO groupBy
        const attributeName = attr.attributeTypes.name;
        let attrValues = resMap.get(attributeName);
        if (!attrValues) {
          attrValues = [];
          resMap.set(attributeName, attrValues);
        }
        attrValues.push(attr);
        return resMap;
      }, new Map<string, MergeCandidateAttribute[]>()),
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
