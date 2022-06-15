import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '@services/modal.service';
import { EditCandidateModalComponent } from '@components/shared/edit-candidate-modal/edit-candidate-modal.component';
import { EModalSizes } from '@constants/strings';

@Component({
  selector: 'app-candidate-action',
  templateUrl: './candidate-action.component.html',
})
export class CandidateActionComponent implements OnInit {
  constructor(private _route: ActivatedRoute, private _modalService: ModalService) {}

  ngOnInit(): void {
    this._route.fragment.subscribe((f) => {
      const element = document.querySelector(`#${f}`);
      if (element) {
        element.scrollIntoView();
      }
    });
  }

  openEditModal() {
    this._modalService.open(EditCandidateModalComponent, EModalSizes.MD);
  }
}
