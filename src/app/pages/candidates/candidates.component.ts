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

  // eslint-disable-next-line no-magic-numbers
  public pageSize: number = 10;

  public pageNumber: number = 1;

  public length = 0;

  // eslint-disable-next-line no-magic-numbers
  public pageSizeOptions: number[] = [10, 20, 25];

  constructor(
    private candidatesService: CandidatesService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      email: [''],
    });
    this.getCandidatesList({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      keyword: this.keywordsList,
    });
  }

  public getCandidatesList(filterData: CandidatesFilterData) {
    this.pageState.startLoading();

    this.candidatesService.getCandidates(filterData).subscribe({
      next: (resolve: any) => {
        this.candidatesList = resolve.candidates;
        this.length = resolve.totalAmount;
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
    this.getCandidatesList({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      keyword: this.keywordsList,
    });
  }

  public add($event: Event): void {
    this.keywordsList.push(($event.target as HTMLInputElement).value.toLowerCase());
    this.keywordsInput = '';
    this.getCandidatesList({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      keyword: this.keywordsList,
    });
  }

  onPageChanged(e: any) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    this.getCandidatesList({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      keyword: this.keywordsList,
    });
  }
}
