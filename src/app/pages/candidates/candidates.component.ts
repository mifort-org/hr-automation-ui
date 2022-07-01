import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CandidatesService } from '@services/candidates.service';
import { Candidate, CandidatesFilterData } from '@interfaces/candidates';
import { PageState } from '@utils/pageState';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  showFiller = false;

  candidatesList: Candidate[] = [];

  pageState = new PageState();

  filterForm!: FormGroup;

  keywordsList: any[] = [];

  keywordsInput = '';

  constructor(private candidatesService: CandidatesService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      email: [''],
    });
    this.getCandidatesList({ pageNumber: 1, pageSize: 100, keyword: this.keywordsList });
  }

  getCandidatesList(filterData: CandidatesFilterData) {
    this.pageState.startLoading();

    this.candidatesService.getCandidates(filterData).subscribe({
      next: (resolve: Candidate[]) => {
        this.candidatesList = resolve;
        this.pageState.finishLoading();
      },
      error: (error: any) => {
        this.pageState.catchError(error);
        this.pageState.finishLoading();
      },
    });
  }

  remove($event: any): void {
    this.keywordsList = this.keywordsList?.filter((el) => el !== $event);
    this.getCandidatesList({ pageNumber: 1, pageSize: 100, keyword: this.keywordsList });
  }

  add($event: any): void {
    this.keywordsList.push($event?.target?.value.toLowerCase());
    this.keywordsInput = '';
    this.getCandidatesList({ pageNumber: 1, pageSize: 100, keyword: this.keywordsList });
  }
}
