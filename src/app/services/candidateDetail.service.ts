import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Candidate, CandidateAttribute, CandidateAttributesValues } from '@interfaces/candidates';
import { CandidatesService } from '@services/candidates.service';
import { CommentData, HistoryElement } from '@interfaces/history';
import { HistoryService } from '@services/history.service';
import { NotificationService } from '@services/notification.service';
import { DialogModalIds, ERROR_MESSAGE } from '@constants/strings';
import { ERROR_STATUS_CODES } from '@constants/errorStatusCode';
import { ENotificationMode } from '@constants/notification';
import { ModalService } from '@services/modal.service';
import { FetchService } from './fetch.service';

@Injectable()
export class CandidateDetailService implements OnDestroy {
  public currentCandidate$: BehaviorSubject<Candidate | null> =
    new BehaviorSubject<Candidate | null>(null);

  public historyOfCurrentCandidate$: BehaviorSubject<HistoryElement[] | null> = new BehaviorSubject<
    HistoryElement[] | null
  >(null);

  public candidateAttributes$: BehaviorSubject<CandidateAttributesValues[] | null> =
    new BehaviorSubject<CandidateAttributesValues[] | null>(null);

  private unSubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fetch: FetchService,
    private router: Router,
    private candidatesService: CandidatesService,
    private historyService: HistoryService,
    private notification: NotificationService,
    private modalService: ModalService
  ) {
    const urlArr = router.url.split('/');
    this.getCandidateById(urlArr[urlArr.length - 1]);
    this.modalService.dialog.afterOpened.pipe(takeUntil(this.unSubscribe$)).subscribe((modal) => {
      if (modal.id === DialogModalIds.addCommentModal) {
        modal
          .beforeClosed()
          .pipe(take(1))
          .subscribe((data?: CommentData) => {
            if (data?.comment) {
              this.createNewComment(data);
            }
          });
      }
    });
  }

  public getCandidateById(id: string): void {
    this.candidatesService
      .getCandidateById(id)
      .pipe(take(1))
      .subscribe({
        next: (candidate: Candidate) => {
          this.currentCandidate$.next(candidate);
          const candidateAttributes: CandidateAttributesValues[] =
            candidate.candidateAttributes.map((attribute: CandidateAttribute) => {
              const candidateAttributeValue: CandidateAttributesValues = {
                name: attribute.attributeTypes.name || '',
                value: attribute.value || '',
              };
              return candidateAttributeValue;
            });
          this.candidateAttributes$.next(candidateAttributes);
          this.fetchHistoryForCurrentCandidate();
        },
        error: (error: any) => {
          this.notification.show(
            ERROR_MESSAGE[error?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
            ENotificationMode.ERROR
          );
        },
      });
  }

  public fetchHistoryForCurrentCandidate(): void {
    const candidateId = this.currentCandidate$.getValue()?.id;
    if (candidateId) {
      this.historyService.getCandidateHistoryById(candidateId).subscribe({
        next: (history: HistoryElement[]) => {
          this.historyOfCurrentCandidate$.next(history);
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

  public createNewComment(data: CommentData): void {
    const candidateId = this.currentCandidate$.getValue()?.id;
    if (candidateId) {
      this.historyService.createNewCandidateHistory(data, candidateId).subscribe({
        next: () => {
          this.fetchHistoryForCurrentCandidate();
          this.notification.show('Comment was added', ENotificationMode.SUCCESS);
        },
        error: (err) => {
          this.notification.show(
            ERROR_MESSAGE[err?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
            ENotificationMode.ERROR
          );
        },
      });
    }
  }

  public updateComment(data: CommentData): void {
    const candidateId = this.currentCandidate$.getValue()?.id.toString() || '';
    this.historyService
      .updateCandidateHistory(candidateId, data)
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: () => {
          this.notification.show('Candidate history is updated', ENotificationMode.SUCCESS);
          this.fetchHistoryForCurrentCandidate();
        },
        error: (error: any) => {
          this.notification.show(
            ERROR_MESSAGE[error?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
            ENotificationMode.ERROR
          );
        },
      });
  }

  public deleteHistoryComment(commentId: number): void {
    const candidateId = this.currentCandidate$.getValue()?.id.toString() || '';
    this.historyService
      .deleteCandidateHistory(candidateId, commentId.toString())
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: () => {
          this.notification.show('Candidate history is deleted', ENotificationMode.SUCCESS);
          this.fetchHistoryForCurrentCandidate();
        },
        error: (error: any) => {
          this.notification.show(
            ERROR_MESSAGE[error?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
            ENotificationMode.ERROR
          );
        },
      });
  }

  ngOnDestroy() {
    this.unSubscribe$.next(true);
    this.unSubscribe$.complete();
  }
}
