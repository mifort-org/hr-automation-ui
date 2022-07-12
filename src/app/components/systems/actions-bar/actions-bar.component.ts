import { Component } from '@angular/core';

import { EModalSizes } from '@constants/strings';
import { NewCandidateModalComponent } from '@components/shared/new-candidate-modal/new-candidate-modal.component';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'app-actions-bar',
  templateUrl: './actions-bar.component.html',
  styleUrls: ['./actions-bar.component.scss'],
})
export class ActionsBarComponent {
  constructor(private modalService: ModalService) {}

  public createNewCandidateModalOpen(): void {
    this.modalService.open(NewCandidateModalComponent, EModalSizes.SM);
  }
}
