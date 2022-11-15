import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from '@src/app/models/candidate';
import { AddCommentModalComponent } from '@pages/candidate-detail/add-comment-modal/add-comment-modal.component';
import { DialogModalIds, EModalSizes } from '@constants/strings';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'app-candidate-item',
  templateUrl: './candidate-item.component.html',
  styleUrls: ['./candidate-item.component.scss'],
})
export class CandidateItemComponent implements OnInit {
  @Input() candidate: Candidate | null = null;

  hasContacts: boolean = false;

  hasLocation: boolean = false;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.hasContacts = this.checkContacts();
    this.hasLocation = this.checkLocation();
  }

  checkContacts(): boolean {
    return !!this.candidate?.contacts?.email || !!this.candidate?.contacts?.phone;
  }

  checkLocation(): boolean {
    return !!this.candidate?.city;
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
}
