import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, take, mergeMap, Observable } from 'rxjs';
import { CandidateAttributesTypes } from '@src/app/models/candidates';
import { ENotificationMode } from '../constants/notification';
import { PageState } from '../utils/pageState';
import { CandidatesService } from './candidates.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class MergeService {
  public pageState = new PageState();

  public attributesTitles: Array<string> = [];

  public attributesTitles2!: Observable<string[]>;

  public attributesMatrix: Array<Array<string>> = [];

  public finalAttributesMatrix: Array<Array<string>> = [];

  public finalResultSubject$: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>([]);

  public candidatesIdsSubject$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
    'uliana_fomina1',
    'artem_skrebets',
    'vladimir_zelmanchuk',
  ]);

  constructor(
    private candidateService: CandidatesService,
    private notification: NotificationService
  ) {}

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
        forkJoin(
          candidatesIds.map(
            (id) => this.candidateService.getCandidateAttributesById(id)
            // .pipe(catchError((error) => of(error.status)))
          )
        )
      )
    );
  }

  parseCanditatesAttributes(): void {
    if (this.candidatesIdsSubject$.getValue().length) {
      this.pageState.startLoading();
    }
    this.fetchCanditatesAttributes().subscribe(
      (candidatesArrays: CandidateAttributesTypes[][]) => {
        this.checkValidateAnswer(candidatesArrays);
        // if (indexNonArray !== -1) {
        //   this.removeCandidateByIndex(indexNonArray);
        // } else {
        // eslint-disable-next-line no-console
        console.log(candidatesArrays);
        this.fillTitleValues(candidatesArrays);
        this.fillAttributesMatrix(candidatesArrays);
        // }
        this.pageState.finishLoading();
      },
      (error) => {
        this.pageState.catchError(error);
        this.pageState.finishLoading();
      }
    );
    // this.attributesTitles2 = this.fetchCanditatesAttributes().pipe(
    //   map((attributesArrays) =>
    //     attributesArrays.reduce((acc: string[], attributesArray: CandidateAttributesTypes[]) => {
    //       const resultArray: string[] = [];
    //       attributesArray.forEach((attribute: CandidateAttributesTypes) => {
    //         if (!acc.includes(attribute.name)) {
    //           resultArray.push(attribute.name);
    //         }
    //       });
    //       return [...acc, ...resultArray];
    //     }, [])
    //   )
    // );
  }

  checkValidateAnswer(answerArray: any[]) {
    const indexNonArray = answerArray.findIndex((array) => !Array.isArray(array));
    if (indexNonArray !== -1) {
      this.removeCandidateByIndex(indexNonArray);
    }
  }

  fillTitleValues(candidates: CandidateAttributesTypes[][]): void {
    const attributesSetList = new Set();
    const finalResult: string[][] = [];

    candidates.forEach((attrArray) =>
      attrArray.forEach((attr) => attributesSetList.add(attr.name))
    );
    this.attributesTitles = [...(Array.from(attributesSetList.values()) as Array<string>)];
    this.attributesTitles.forEach(() => finalResult.push([]));
    this.addFinalResult(finalResult);
  }

  fillAttributesMatrix(candidates: CandidateAttributesTypes[][]): void {
    this.attributesMatrix = candidates.map((candidateArr) =>
      this.attributesTitles.map((item) => {
        const candidateAttribute = candidateArr.find((attr) => attr.name === item);
        return candidateAttribute ? candidateAttribute.value : '';
      })
    );
    this.finalAttributesMatrix = this.attributesMatrix.map((item) => item.map(() => ''));
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
    this.finalAttributesMatrix[indexCandidate].forEach((attr, index) => {
      this.finalAttributesMatrix[indexCandidate][index] = checked
        ? this.attributesMatrix[indexCandidate][index]
        : '';
    });
    this.calculateResult();
  }

  isAllCandidateAttributesChoose(indexCandidateMatrix: number): boolean {
    return !this.attributesMatrix.length
      ? false
      : this.attributesMatrix[indexCandidateMatrix].every(
          (attr, index) => attr === this.finalAttributesMatrix[indexCandidateMatrix][index]
        );
  }

  calculateResult(): void {
    const finalResult: string[][] = [];
    this.attributesTitles.forEach(() => finalResult.push([]));

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
