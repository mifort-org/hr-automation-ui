/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { forkJoin, mergeMap, Observable, Subject, map, tap, distinctUntilChanged } from 'rxjs';
import { ENotificationMode } from '@constants/notification';
import { CandidatesService } from '@services/candidates.service';
import { NotificationService } from '@services/notification.service';
import { MergeCandidate } from '@pages/merge-page/view-model/MergeCandidate';
import { Candidate, CandidateAttribute } from '@src/app/models/candidates';
import { MergeCandidateAttribute } from '@pages/merge-page/view-model/MergeCandidateAttribute';

function attributeToMergeModel(
  candidateId: string,
  attr: CandidateAttribute
): MergeCandidateAttribute {
  return {
    ...attr,
    candidateId,
    selected: false,
  };
}

function candidateToMergeModel(candidate: Candidate): MergeCandidate {
  const attributes = candidate.candidateAttributes.map((attr) =>
    attributeToMergeModel(candidate.id, attr)
  );
  return {
    ...candidate,
    selected: false,
    show: true,
    attributes,
    attributesMap: attributes.reduce((resMap, attr) => {
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

@Injectable({
  providedIn: 'root',
})
export class MergeService {
  private readonly candidates$: Observable<MergeCandidate[]>;

  private readonly candidatesIds$: Subject<string[]> = new Subject<string[]>();

  constructor(
    private candidateService: CandidatesService,
    private notification: NotificationService
  ) {
    console.log('MergeService.constructor');
    this.candidates$ = this.candidatesIds$.pipe(
      tap((ids) => {
        console.log('candidatesIds$ - tap -1-', ids);
      }),
      distinctUntilChanged(),
      mergeMap((candidatesIds) =>
        forkJoin(candidatesIds.map((id) => this.candidateService.getCandidateById(id)))
      ),
      tap((ids) => {
        console.log('candidatesIds$ - tap -2-', ids);
      }),
      map((candidates) => candidates.map(candidateToMergeModel))
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
}
