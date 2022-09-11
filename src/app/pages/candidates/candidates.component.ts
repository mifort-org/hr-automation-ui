import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, FormGroup } from '@angular/forms';
import { CandidatesService } from '@services/candidates.service';
import { Candidate } from '@src/app/models/candidate';
import { CandidatesFilterData } from '@src/app/models/candidatesFilterData';
import { PageState } from '@utils/pageState';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  public candidatesList: Candidate[] = [];

  public pageState = new PageState();

  public filterForm!: FormGroup;

  public keywordsList: string[] = [];

  public keywordsInput = '';

  constructor(
    private candidatesService: CandidatesService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      email: [''],
    });
    this.getCandidatesList({ pageNumber: 1, pageSize: 100, keyword: this.keywordsList });
  }

  public getCandidatesList(filterData: CandidatesFilterData) {
    this.pageState.startLoading();

    this.candidatesService.getCandidates(filterData).subscribe({
      next: (resolve: Candidate[]) => {
        this.candidatesList = resolve;
        this.pageState.finishLoading();
      },
      error: (error: string) => {
        this.pageState.catchError(error);
        this.pageState.finishLoading();
      },
    });
  }

  public remove(keyword: string): void {
    this.keywordsList = this.keywordsList?.filter((el) => el !== keyword);
    this.getCandidatesList({ pageNumber: 1, pageSize: 100, keyword: this.keywordsList });
  }

  public add($event: Event): void {
    this.keywordsList.push(($event.target as HTMLInputElement).value.toLowerCase());
    this.keywordsInput = '';
    this.getCandidatesList({ pageNumber: 1, pageSize: 100, keyword: this.keywordsList });
  }
}
