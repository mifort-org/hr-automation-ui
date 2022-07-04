import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { CandidatesService } from './candidates.service';

@Injectable({
  providedIn: 'root',
})
export class MergeService {
  constructor(private candidateService: CandidatesService) {}

  private candidatesIds: string[] = ['uliana_fomina', 'artem_skrebets', 'vladimir_zelmanchuk'];

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

  mergeCandidates(attributesTitle: string[], finalResult: string[][]) {
    // eslint-disable-next-line no-console
    attributesTitle.forEach((item, index) => console.log(`${item}: ${finalResult[index]}`));
  }
}
