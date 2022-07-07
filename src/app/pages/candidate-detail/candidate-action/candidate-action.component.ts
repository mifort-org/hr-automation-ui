import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '@services/modal.service';
import { EditCandidateModalComponent } from '@components/shared/edit-candidate-modal/edit-candidate-modal.component';
import { DialogModalIds, EModalSizes } from '@constants/strings';
import { ROUTES } from '@src/app/routes';
import { AddCommentModalComponent } from '@pages/candidate-detail/add-comment-modal/add-comment-modal.component';

@Component({
  selector: 'app-candidate-action',
  styleUrls: ['candidate-action.scss'],
  templateUrl: './candidate-action.component.html',
})
export class CandidateActionComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.route.fragment.subscribe({
      next: (f) => {
        const element = document.querySelector(`#${f}`);
        if (element) {
          element.scrollIntoView();
        }
      },
    });
  }

  openEditModal(): void {
    this.modalService.open(EditCandidateModalComponent, EModalSizes.MD);
  }

  openAddCommentModal(): void {
    this.modalService.open(
      AddCommentModalComponent,
      EModalSizes.MD,
      null,
      undefined,
      DialogModalIds.addCommentModal
    );
  }

  back(): void {
    this.router.navigate([ROUTES.CANDIDATES]);
  }
}
