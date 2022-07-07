import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { ENotificationMode } from '../constants/notification';
import { CandidatesService } from './candidates.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class MergeService {
  constructor(
    private candidateService: CandidatesService,
    private notification: NotificationService
  ) {}

  attributesTitles: string[] = [];

  finalResultSubject = new BehaviorSubject<string[][]>([]);

  candidatesIdsSubject = new BehaviorSubject<string[]>([
    'uliana_fomina',
    'artem_skrebets',
    'vladimir_zelmanchuk',
  ]);

  addCandidateId(id: string) {
    this.candidatesIdsSubject.pipe(take(1)).subscribe((candidatesIds) => {
      if (!candidatesIds.includes(id)) {
        this.candidatesIdsSubject.next([...candidatesIds, id]);
      }
    });
  }

  removeCandidateId(id: string) {
    this.candidatesIdsSubject.pipe(take(1)).subscribe((candidatesIds) => {
      this.candidatesIdsSubject.next(candidatesIds.filter((item) => item !== id));
    });
  }

  removeAllCandidatesId() {
    this.candidatesIdsSubject.next([]);
  }

  isCandidates() {
    let isCandidatesEmpty = false;
    this.candidatesIdsSubject.pipe(take(1)).subscribe((candidatesIds) => {
      isCandidatesEmpty = !!candidatesIds.length;
    });
    return isCandidatesEmpty;
  }

  getCandidateIdbyIndex(index: number) {
    let candidateByIndex = '';
    this.candidatesIdsSubject.pipe(take(1)).subscribe((candidatesIds) => {
      candidateByIndex = candidatesIds[index];
    });
    return candidateByIndex;
  }

  fetchCanditatesAttributes() {
    // this.candidatesIdsSubject.pipe(mergeMap((q) => forkJoin(...q.map())));
  }

  addFinalResult(finalResult: string[][]) {
    this.finalResultSubject.next(finalResult);
  }

  addTitles(attributesTitles: string[]) {
    this.attributesTitles = attributesTitles;
  }

  mergeCandidates() {
    if (this.checkFilledResult() && this.attributesTitles.length) {
      this.finalResultSubject.pipe(take(1)).subscribe((results) => {
        this.attributesTitles.forEach((item, index) =>
          // eslint-disable-next-line no-console
          console.log(`${item}: ${results[index]}`)
        );
      });

      this.notification.show('Successfully merged. Check console', ENotificationMode.SUCCESS);
    } else {
      this.notification.show('Please fill all fields', ENotificationMode.ERROR);
    }
  }

  checkFilledResult(): boolean {
    let isFilled = false;
    this.finalResultSubject.pipe(take(1)).subscribe((results) => {
      isFilled = results.every((result) => result.length);
    });
    return isFilled;
  }
}
