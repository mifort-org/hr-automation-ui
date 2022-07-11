import { Injectable, OnDestroy } from '@angular/core';
import {
  combineLatest,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { Router } from '@angular/router';
import { CandidateAttributesValues, Candidate } from '@interfaces/candidates';
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
  public currentCandidate$: Observable<Candidate>;

  public historyOfCurrentCandidate$: Observable<HistoryElement[]>;

  public candidateAttributes$: Observable<CandidateAttributesValues[] | null>;

  private historyUpdate$: Subject<boolean> = new Subject<boolean>();

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
    this.currentCandidate$ = this.getCandidateById(urlArr[urlArr.length - 1]);
    this.candidateAttributes$ = this.currentCandidate$.pipe(
      map((c) => c.candidateAttributesValues)
    );
    this.historyOfCurrentCandidate$ = combineLatest([
      this.historyUpdate$,
      this.currentCandidate$,
    ]).pipe(
      switchMap(([, candidate]: [boolean, Candidate]) => {
        return this.historyService.getCandidateHistoryById(candidate.id);
      })
    );

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

  private getCandidateById(id: string): Observable<Candidate> {
    return this.candidatesService.getCandidateById(id).pipe(take(1));
  }

  public createNewComment(data: CommentData): void {
    this.currentCandidate$
      .pipe(
        switchMap((candidate) => this.historyService.createNewCandidateHistory(data, candidate.id))
      )
      .subscribe({
        next: () => {
          this.historyUpdate$.next(true);
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

  public updateComment(data: CommentData): void {
    const candidateId = this.currentCandidate$.getValue()?.id.toString() || '';
    this.historyService
      .updateCandidateHistory(candidateId, data)
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: () => {
          this.historyUpdate$.next(true);
          this.notification.show('Candidate history is updated', ENotificationMode.SUCCESS);
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
          this.historyUpdate$.next(true);
          this.notification.show('Candidate history is deleted', ENotificationMode.SUCCESS);
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
