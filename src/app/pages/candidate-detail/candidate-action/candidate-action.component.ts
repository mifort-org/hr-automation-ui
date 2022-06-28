import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '@services/modal.service';
import { EditCandidateModalComponent } from '@components/shared/edit-candidate-modal/edit-candidate-modal.component';
import { AddCommentModalComponent } from '@components/shared/add-comment-modal/add-comment-modal.component';
import { EModalSizes } from '@constants/strings';
import { ROUTES } from '@src/app/routes';

@Component({
  selector: 'app-candidate-action',
  styleUrls: ['candidate-action.scss'],
  templateUrl: './candidate-action.component.html',
})
export class CandidateActionComponent implements OnInit {
  @Output() historyWasChanged: EventEmitter<boolean> = new EventEmitter(false);

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _modalService: ModalService
  ) {}

  ngOnInit(): void {
    this._route.fragment.subscribe((f) => {
      const element = document.querySelector(`#${f}`);
      if (element) element.scrollIntoView();
    });
  }

  openEditModal() {
    this._modalService.open(EditCandidateModalComponent, EModalSizes.MD);
  }

  openAddCommentModal() {
    this._modalService.open(AddCommentModalComponent, EModalSizes.MD, null, () =>
      this.historyWasChanged.emit(true)
    );
  }

  back() {
    this._router.navigate([ROUTES.CANDIDATES]);
  }
}
