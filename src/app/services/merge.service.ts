import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, take, mergeMap, Observable, catchError, of } from 'rxjs';
import { ENotificationMode } from '../constants/notification';
// eslint-disable-next-line import/no-cycle
import { AttributeTypes } from '../pages/merge-page/merge-page.component';
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

  attributesMatrix: Array<Array<string>> = [];

  finalAttributesMatrix: Array<Array<string>> = [];

  finalResultSubject$ = new BehaviorSubject<string[][]>([]);

  candidatesIdsSubject$ = new BehaviorSubject<string[]>([
    'uliana_fomina',
    'artem_skrebets',
    'vladimir_zelmanchuk',
  ]);

  addCandidateId(id: string) {
    this.candidatesIdsSubject$.pipe(take(1)).subscribe((candidatesIds) => {
      if (!candidatesIds.includes(id)) {
        this.candidatesIdsSubject$.next([...candidatesIds, id]);
      }
    });
  }

  removeCandidateById(id: string) {
    this.candidatesIdsSubject$.pipe(take(1)).subscribe((candidatesIds) => {
      this.candidatesIdsSubject$.next(candidatesIds.filter((item) => item !== id));
    });
  }

  removeCandidateByIndex(index: number) {
    this.candidatesIdsSubject$.pipe(take(1)).subscribe((candidatesIds) => {
      candidatesIds.splice(index, 1);
      this.candidatesIdsSubject$.next(candidatesIds);
    });
  }

  isCandidates() {
    return !!this.candidatesIdsSubject$.getValue().length;
  }

  getCandidateIdbyIndex(index: number) {
    return this.candidatesIdsSubject$.getValue()[index];
  }

  fetchCanditatesAttributes(): Observable<AttributeTypes[][]> {
    return this.candidatesIdsSubject$.pipe(
      mergeMap(
        (q) =>
          forkJoin(
            ...q.map((id) =>
              this.candidateService
                .getCandidateAttributesById(id)
                .pipe(catchError((error) => of(error.status)))
            )
          ) as Observable<AttributeTypes[][]>
      )
    );
  }

  // parseCanditatesAttributes() {
  //   this.fetchCanditatesAttributes().subscribe();
  // }

  // fillTitleValues() {
  //   const attributesSetList = new Set();
  //   const finalResult: string[][] = [];
  //   this.candidates.forEach((attrArray) =>
  //     attrArray.forEach((attr) => attributesSetList.add(attr.name))
  //   );
  //   this.attributesTitles = [...(Array.from(attributesSetList.values()) as Array<string>)];
  //   this.attributesTitles.forEach(() => finalResult.push([]));
  //   this.addFinalResult(finalResult);
  //   // this.addTitles(this.attributesTitles);
  // }

  addFinalResult(finalResult: string[][]) {
    this.finalResultSubject$.next(finalResult);
  }

  addTitles(attributesTitles: string[]) {
    this.attributesTitles = attributesTitles;
  }

  mergeCandidates() {
    if (this.checkFilledResult() && this.attributesTitles.length) {
      this.finalResultSubject$.pipe(take(1)).subscribe((results) => {
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
    return this.finalResultSubject$.getValue().every((result) => result.length);
  }
}
