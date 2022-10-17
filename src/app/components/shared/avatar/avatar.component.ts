import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { STATUS_COLOR, CandidateStatus } from '@src/app/constants/candidates';
import { Candidate } from '@src/app/models/candidate';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnChanges {
  @Input() candidate: Candidate | undefined | null;

  initials: string = '';

  imageExists: boolean = false;

  @HostBinding('style.background-color') selectedColor: string = '';

  @HostBinding('style.box-shadow') shadowColor: string = '';

  ngOnChanges(changes: any): void {
    if (changes.candidate.currentValue) {
      this.selectedColor = this.getColor(this.candidate!.status);
      this.shadowColor = this.getShadowColor(this.selectedColor);
      this.initials = this.getInitials(this.candidate?.firstName!, this.candidate?.lastName!);
    }
  }

  getInitials(name: string, surname: string): string {
    if (name == null || surname == null) {
      return '';
    }
    const [firstNameInitial] = name;
    const [lastNameInitial] = surname;

    if (firstNameInitial == null || lastNameInitial == null) {
      return '';
    }
    return (firstNameInitial + lastNameInitial).toLocaleUpperCase();
  }

  getColor(status: CandidateStatus): string {
    return STATUS_COLOR[status] || STATUS_COLOR[CandidateStatus.CREATED];
  }

  getShadowColor(colorHex: string): string {
    return `0px 0px 0px 3px ${colorHex}80`;
  }
}
