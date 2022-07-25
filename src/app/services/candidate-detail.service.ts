import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CandidatesService } from '@services/candidates.service';
import { HistoryElement } from '@src/app/models/historyElement';
import { HistoryService } from '@services/history.service';
import { DialogModalIds } from '@constants/strings';
import { ModalService } from '@services/modal.service';
import { Candidate } from '../models/candidate';
import { CommentData } from '../models/commentData';
import { FetchService } from './fetch.service';

@Injectable()
export class CandidateDetailService implements OnDestroy {
  public currentCandidate$: Observable<Candidate>;

  public historyOfCurrentCandidate$: Observable<HistoryElement[]>;

  private historyUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private unSubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fetch: FetchService,
    private candidatesService: CandidatesService,
    private historyService: HistoryService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute
  ) {
    this.currentCandidate$ = activatedRoute.params.pipe(
      switchMap((params) => this.getCandidateById(params['id']).pipe(take(1)))
    );

    this.historyOfCurrentCandidate$ = combineLatest([
      this.historyUpdate$,
      this.currentCandidate$,
    ]).pipe(
      takeUntil(this.unSubscribe$),
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

  public createNewComment(data: CommentData): void {
    this.currentCandidate$
      .pipe(
        switchMap((candidate) =>
          this.historyService.createNewCandidateHistory(data, candidate.id).pipe(take(1))
        )
      )
      .subscribe({
        next: () => {
          this.historyUpdate$.next(true);
        },
      });
  }

  public updateComment(data: CommentData): void {
    this.currentCandidate$
      .pipe(
        switchMap((candidate) =>
          this.historyService.updateCandidateHistory(candidate.id, data).pipe(take(1))
        )
      )
      .subscribe({
        next: () => {
          this.historyUpdate$.next(true);
        },
      });
  }

  public deleteHistoryComment(commentId: number): void {
    this.currentCandidate$
      .pipe(
        switchMap((candidate) =>
          this.historyService
            .deleteCandidateHistory(candidate.id, commentId.toString())
            .pipe(take(1))
        )
      )
      .subscribe({
        next: () => {
          this.historyUpdate$.next(true);
        },
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(true);
    this.unSubscribe$.complete();
  }

  private getCandidateById(id: string): Observable<Candidate> {
    return this.candidatesService.getCandidateById(id).pipe(take(1));
  }
}
