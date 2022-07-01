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

  candidateAttributesValues: CandidateAttributesValues[] = [];

  candidateHistory!: HistoryElement[];

  constructor(
    private candidateService: CandidatesService,
    private historyService: HistoryService,
    private activatedRoute: ActivatedRoute,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.candidateId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.fetchCurrentCandidate();
    this.fetchHistoryForCurrentCandidate();
  }

  fetchCurrentCandidate(): void {
    if (this.candidateId) {
      this.candidateService
        .getCandidateById(this.candidateId)
        .pipe(take(1))
        .subscribe({
          next: (candidate: Candidate) => {
            this.candidate = candidate;
            this.candidateAttributesValues = candidate.candidateAttributes.map(
              (attribute: CandidateAttribute) => {
                const candidateAttributeValue: CandidateAttributesValues = {
                  name: attribute.attributeTypes.name || '',
                  value: attribute.value || '',
                };
                return candidateAttributeValue;
              }
            );
          },
          error: (error: any) => {
            this.notification.show(
              ERROR_MESSAGE[error?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
              ENotificationMode.ERROR
            );
          },
        });
    }
  }

  fetchHistoryForCurrentCandidate(): void {
    if (this.candidateId) {
      this.historyService
        .getCandidateHistoryById(this.candidateId)
        .pipe(take(1))
        .subscribe({
          next: (history) => {
            this.candidateHistory = history;
          },
          error: (error) => {
            this.notification.show(
              ERROR_MESSAGE[error?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
              ENotificationMode.ERROR
            );
          },
        });
    }
  }
}
