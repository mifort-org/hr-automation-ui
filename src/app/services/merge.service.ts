import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
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

  private candidatesIds: string[] = ['uliana_fomina', 'artem_skrebets', 'vladimir_zelmanchuk'];

  attributesTitles: string[] = [];

  finalResult: string[][] = [];

  finalResultSubject = new BehaviorSubject<string[][]>(this.finalResult);

  candidatesIdsSubject = new BehaviorSubject<string[]>(this.candidatesIds);

  addCandidateId(id: string) {
    if (!this.candidatesIds.includes(id)) {
      this.candidatesIds.push(id);
    }
    this.candidatesIdsSubject.next(this.candidatesIds);
  }

  removeCandidateId(id: string) {
    this.candidatesIds = this.candidatesIds.filter((item) => item !== id);
    this.candidatesIdsSubject.next(this.candidatesIds);
  }

  removeAllCandidatesId() {
    this.candidatesIds = [];
    this.candidatesIdsSubject.next(this.candidatesIds);
  }

  getCandidatesIds() {
    return this.candidatesIdsSubject;
  }

  getFinalResult() {
    return this.finalResultSubject;
  }

  isCandidates() {
    return !!this.candidatesIds.length;
  }

  getCandidateIdbyIndex(index: number) {
    return this.candidatesIds[index];
  }

  fetchCanditatesAttributes() {
    const fetchAttrArr = this.candidatesIds.map((item) =>
      this.candidateService.getCandidateAttributesById(item)
    );
    return forkJoin([...fetchAttrArr]);
  }

  addFinalResult(finalResult: string[][]) {
    this.finalResult = finalResult;
    this.finalResultSubject.next(this.finalResult);
  }

  addTitles(attributesTitles: string[]) {
    this.attributesTitles = attributesTitles;
  }

  mergeCandidates() {
    if (this.checkFilledResult() && this.attributesTitles.length) {
      this.attributesTitles.forEach((item, index) =>
        // eslint-disable-next-line no-console
        console.log(`${item}: ${this.finalResult[index]}`)
      );
      this.notification.show('Successfully merged. Check console', ENotificationMode.SUCCESS);
    } else {
      this.notification.show('Please fill all fields', ENotificationMode.ERROR);
    }
  }

  checkFilledResult(): boolean {
    return this.finalResult.every((result) => result.length);
  }
}
