import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MergeService {
  private candidatesIds: string[] = ['uliana_fomina', 'artem_skrebets'];

  addCandidateId(id: string) {
    if (!this.candidatesIds.includes(id)) {
      this.candidatesIds.push(id);
    }
  }

  removeCandidateId(id: string) {
    this.candidatesIds = this.candidatesIds.filter((item) => item !== id);
  }

  removeAllCandidatesId() {
    this.candidatesIds = [];
  }

  getCandidatesIds() {
    return this.candidatesIds;
  }
}
