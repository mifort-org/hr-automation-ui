import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CandidatesService } from '@services/candidates.service';
import { CandidatesFilterData, Candidate } from '@interfaces/candidates';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  showFiller = false;

  candidatesList: Candidate[] = [];

  pageState = {
    error: null,
    loading: false,
  };

  filterForm!: FormGroup;

  keywordsList: any[] = [];

  keywordsInput = '';

  constructor(private _candidatesService: CandidatesService, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this._formBuilder.group({
      email: [''],
    });
    this.getCandidatesList({ pageNumber: 1, pageSize: 100, keyword: this.keywordsList });
  }

  getCandidatesList(filterData: CandidatesFilterData) {
    this.pageState.loading = true;
    this._candidatesService.getCandidates(filterData).subscribe({
      next: (resolve: Candidate[]) => {
        this.candidatesList = resolve;
        this.pageState.loading = false;
      },
      error: (error: any) => {
        this.pageState.error = error;
        this.pageState.loading = false;
      },
    });
  }

  remove($event: any): void {
    const newList = this.keywordsList?.filter((el) => el !== $event);
    this.keywordsList = newList;
    this.getCandidatesList({ pageNumber: 1, pageSize: 100, keyword: this.keywordsList });
  }

  add($event: any): void {
    this.keywordsList.push($event?.target?.value.toLowerCase());
    this.keywordsInput = '';
    this.getCandidatesList({ pageNumber: 1, pageSize: 100, keyword: this.keywordsList });
  }
}
