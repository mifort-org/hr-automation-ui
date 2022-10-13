import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateDetailService } from '@services/candidate-detail.service';
import { Candidate } from '@src/app/models/candidate';
import { AddCommentModalComponent } from '@pages/candidate-detail/add-comment-modal/add-comment-modal.component';
import { DialogModalIds, EModalSizes } from '@constants/strings';
import { ModalService } from '@services/modal.service';
import { CandidateStatus, STATUS_COLOR } from '@constants/candidates';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss'],
  providers: [CandidateDetailService],
})
export class CandidateDetailComponent implements OnInit {
  public candidate$!: Observable<Candidate>;

  public currentCandidate!: Candidate;

  statusColor!: string;

  constructor(
    private candidateDetailService: CandidateDetailService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.candidate$ = this.candidateDetailService.currentCandidate$;
    this.candidateDetailService.currentCandidate$.subscribe((candidate: Candidate) => {
      this.currentCandidate = candidate;
      this.statusColor = this.getColor(this.currentCandidate.status);
    });
  }

  public openAddCommentModal(): void {
    this.modalService.open(
      AddCommentModalComponent,
      EModalSizes.MD,
      null,
      undefined,
      DialogModalIds.addCommentModal
    );
  }

  getColor(status: CandidateStatus): string {
    return STATUS_COLOR[status] || STATUS_COLOR[CandidateStatus.CREATED];
  }
}
