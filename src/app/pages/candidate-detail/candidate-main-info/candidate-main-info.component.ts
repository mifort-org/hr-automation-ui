import { Component, OnInit } from '@angular/core';
import { CandidateDetailService } from '@services/candidate-detail.service';
import { Candidate } from '@src/app/models/candidate';
import { ModalService } from '@src/app/services/modal.service';
import { EditCandidateModalComponent } from '@pages/candidate-detail/edit-candidate-modal/edit-candidate-modal.component';
import { EModalSizes } from '@constants/strings';

@Component({
  selector: 'app-candidate-main-info',
  styleUrls: ['candidate-main-info.component.scss'],
  templateUrl: './candidate-main-info.component.html',
})
export class CandidateMainInfoComponent implements OnInit {
  public candidate!: Candidate;

  public contactInformation: { name: string; value: string | undefined; icon: string }[] = [];

  public displayedColumns: string[] = ['name', 'value'];

  constructor(
    private candidateDetailService: CandidateDetailService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.candidateDetailService.currentCandidate$.subscribe((candidate: Candidate) => {
      this.candidate = candidate;
      this.modifyContactInfo();
    });
  }

  // modify contact info array for use with angular material and add icons
  public modifyContactInfo() {
    Object.keys(this.candidate.contacts!).forEach((key) => {
      let icon = '';
      this.candidate.candidateAttributes.forEach((attributes) => {
        if (attributes.attributeTypes.name === key) {
          icon = attributes.attributeTypes.icon!;
        }
      });
      this.contactInformation.push({
        name: key,
        value: this.candidate.contacts![key as keyof typeof this.candidate.contacts],
        icon,
      });
    });
  }

  public openEditModal(): void {
    this.modalService.open(EditCandidateModalComponent, EModalSizes.MD);
  }
}
