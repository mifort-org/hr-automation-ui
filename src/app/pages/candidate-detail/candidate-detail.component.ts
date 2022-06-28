import { Observable, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatesService } from '@services/candidates.service';
import { HistoryService } from '@services/history.service';
import { Candidate, CandidateAttribute, CandidateAttributesValues } from '@interfaces/candidates';
import { History } from '@interfaces/history';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss'],
})
export class CandidateDetailComponent implements OnInit {
  candidateId!: string;

  candidate!: Candidate | null;

  candidateAttribute!: CandidateAttribute[] | null;

  candidateAttributesValues: CandidateAttributesValues[] = [];

  candidateHistory: History = [];

  constructor(
    private _router: Router,
    private _candidateService: CandidatesService,
    private _historyService: HistoryService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap((param): Observable<History> => {
          this.candidateId = param['id'];
          return this._historyService.getCandidateHistoryById(this.candidateId);
        })
      )
      .subscribe((resolve: History) => {
        this.candidateHistory = resolve;
      });

    this._activatedRoute.params
      .pipe(
        switchMap((param): Observable<Candidate> => {
          this.candidateId = param['id'];
          return this._candidateService.getCandidateById(this.candidateId);
        })
      )
      .subscribe((resolve: Candidate) => {
        this.candidateAttribute = resolve.candidateAttributes;
        this.candidate = resolve;
        this.candidateAttributesValues = resolve.candidateAttributes.reduce((acc, el) => {
          if (el.value) {
            if (el.attributeTypes.name === 'firstname' || el.attributeTypes.name === 'lastname') {
              const fullNameField = acc.find((e) => e.name === 'fullName');
              if (fullNameField) {
                fullNameField.value += ` ${el.value}`;
                return acc;
              }
              return [...acc, { name: 'fullName', value: el.value }];
            }
            return [...acc, { name: el.attributeTypes.name, value: el.value }];
          }
          return acc;
        }, [] as CandidateAttributesValues[]);
      });
  }
}
