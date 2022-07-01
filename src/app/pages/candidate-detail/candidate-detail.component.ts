import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { CandidatesService } from '@services/candidates.service';
import { HistoryService } from '@services/history.service';
import { Candidate, CandidateAttribute, CandidateAttributesValues } from '@interfaces/candidates';
import { HistoryElement } from '@interfaces/history';
import { NotificationService } from '@services/notification.service';
import { ENotificationMode } from '@constants/notification';
import { ERROR_MESSAGE } from '@constants/strings';
import { ERROR_STATUS_CODES } from '@constants/errorStatusCode';

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

  candidateHistory!: HistoryElement[];

  constructor(
    private _candidateService: CandidatesService,
    private _historyService: HistoryService,
    private _activatedRoute: ActivatedRoute,
    private _notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.candidateId = this._activatedRoute.snapshot.paramMap.get('id') || '';
    this.fetchCurrentCandidate();
    this.fetchHistoryForCurrentCandidate();
  }

  fetchCurrentCandidate(): void {
    if (this.candidateId) {
      this._candidateService
        .getCandidateById(this.candidateId)
        .pipe(take(1))
        .subscribe({
          next: (candidate: Candidate) => {
            this.candidate = candidate;
            this.candidateAttribute = candidate.candidateAttributes;
            this.candidateAttributesValues = candidate.candidateAttributes.reduce((acc, el) => {
              if (el.value) {
                if (
                  el.attributeTypes.name === 'firstname' ||
                  el.attributeTypes.name === 'lastname'
                ) {
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
          },
          error: (error: any) => {
            this._notification.show(
              ERROR_MESSAGE[error?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
              ENotificationMode.ERROR
            );
          },
        });
    }
  }

  fetchHistoryForCurrentCandidate(): void {
    if (this.candidateId) {
      this._historyService
        .getCandidateHistoryById(this.candidateId)
        .pipe(take(1))
        .subscribe({
          next: (history) => {
            this.candidateHistory = history;
          },
          error: (error) => {
            this._notification.show(
              ERROR_MESSAGE[error?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
              ENotificationMode.ERROR
            );
          },
        });
    }
  }
}
