import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, take, mergeMap, Observable, map, withLatestFrom } from 'rxjs';
import { CandidateAttributesTypes } from '@src/app/models/candidates';
import { ENotificationMode } from '../constants/notification';
import { CandidatesService } from './candidates.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class MergeService {
  public finalAttributesMatrix: Array<Array<string>> = [];

  public attributesMatrix$!: Observable<string[][]>;

  public attributesTitles2$!: Observable<string[]>;

  public finalResultSubject$: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>([]);

  public candidatesIdsSubject$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
    'uliana_fomina',
    'artem_skrebets',
    'vladimir_zelmanchuk',
  ]);

  constructor(
    private candidateService: CandidatesService,
    private notification: NotificationService
  ) {
    this.attributesTitles2$ = this.fetchCanditatesAttributes().pipe(
      map((attributesArrays) =>
        attributesArrays.reduce((acc: string[], attributesArray: CandidateAttributesTypes[]) => {
          const resultArray: string[] = [];
          attributesArray.forEach((attribute: CandidateAttributesTypes) => {
            if (!acc.includes(attribute.name)) {
              resultArray.push(attribute.name);
            }
          });
          return [...acc, ...resultArray];
        }, [])
      )
    );

    this.attributesTitles2$
      .pipe(map((titles: string[]) => titles.map(() => [])))
      .subscribe(this.finalResultSubject$);

    this.attributesMatrix$ = this.attributesTitles2$.pipe(
      withLatestFrom(this.fetchCanditatesAttributes()),
      map(([titles, candidateAttributes]) => {
        return candidateAttributes.map((candidateArr) =>
          titles.map((item) => {
            const candidateAttribute = candidateArr.find((attr) => attr.name === item);
            return candidateAttribute ? candidateAttribute.value : '';
          })
        );
      })
    );

    this.attributesMatrix$
      .pipe(map((matrix) => matrix.map((item) => item.map(() => ''))))
      .subscribe((matrix) => {
        this.finalAttributesMatrix = matrix;
      });
  }

  addCandidateId(id: string): void {
    const candidatesIds = this.candidatesIdsSubject$.getValue();
    if (!candidatesIds.includes(id)) {
      this.candidatesIdsSubject$.next([...candidatesIds, id]);
    }
  }

  removeCandidateById(id: string): void {
    this.candidatesIdsSubject$.pipe(take(1)).subscribe((candidatesIds) => {
      this.candidatesIdsSubject$.next(candidatesIds.filter((item) => item !== id));
    });
  }

  removeCandidateByIndex(index: number): void {
    this.candidatesIdsSubject$.pipe(take(1)).subscribe((candidatesIds) => {
      candidatesIds.splice(index, 1);
      this.candidatesIdsSubject$.next(candidatesIds);
    });
  }

  isCandidates(): boolean {
    return !!this.candidatesIdsSubject$.getValue().length;
  }

  fetchCanditatesAttributes(): Observable<CandidateAttributesTypes[][]> {
    return this.candidatesIdsSubject$.pipe(
      mergeMap((candidatesIds) =>
        forkJoin(candidatesIds.map((id) => this.candidateService.getCandidateAttributesById(id)))
      )
    );
  }

  attributeIsChecked(indexMatrix: number, indexCandidate: number): boolean {
    return !!this.finalAttributesMatrix[indexMatrix][indexCandidate];
  }

  addFinalResult(finalResult: string[][]): void {
    this.finalResultSubject$.next(finalResult);
  }

  changeAttributes(candidatesMatrixIndexes: Array<number>, candidateAttr: string): void {
    const [indexMatrix, indexCandidate] = candidatesMatrixIndexes;
    this.finalAttributesMatrix[indexMatrix][indexCandidate] = candidateAttr;
    this.calculateResult();
  }

  chooseAllCandidateAttributes(indexCandidate: number, checked: boolean): void {
    this.attributesMatrix$.pipe(take(1)).subscribe((attributesMatrix) => {
      this.finalAttributesMatrix[indexCandidate].forEach((_attr, index) => {
        this.finalAttributesMatrix[indexCandidate][index] = checked
          ? attributesMatrix[indexCandidate][index]
          : '';
      });
      this.calculateResult();
    });
  }

  calculateResult(): void {
    const finalResult: string[][] = [];
    this.finalAttributesMatrix[0].forEach(() => finalResult.push([]));

    this.finalAttributesMatrix.forEach((candAttrArr) => {
      candAttrArr.forEach((attr, index) => {
        if (attr) {
          finalResult[index].push(attr);
        }
      });
    });
    this.addFinalResult(finalResult);
  }

  mergeCandidates(): void {
    if (this.checkFilledResult()) {
      const finalResult = this.finalResultSubject$.getValue();
      this.attributesTitles2$.pipe(take(1)).subscribe((titles) => {
        titles.forEach((title, index) => {
          // eslint-disable-next-line no-console
          console.log(`${title} : ${finalResult[index]}`);
        });
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
