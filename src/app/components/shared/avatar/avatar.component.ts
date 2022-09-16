import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { STATUS_COLOR, CandidateStatus } from '@src/app/constants/candidates';
import { Candidate } from '@src/app/models/candidate';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input() candidate: Candidate | undefined;

  initials: string = '';

  imageExists: boolean = false;

  @HostBinding('style.background-color') selectedColor: string = '';

  @HostBinding('style.box-shadow') shadowColor: string = '';

  ngOnInit(): void {
    this.selectedColor = this.getColor(this.candidate!.status);
    this.shadowColor = this.getShadowColor(this.selectedColor);
    this.initials = this.getInitials(this.candidate?.firstName!, this.candidate?.lastName!);
  }

  getInitials(name: string, surname: string): string {
    const [firstNameInitial] = name;
    const [lastNameInitial] = surname;
    return (firstNameInitial + lastNameInitial).toLocaleUpperCase();
  }

  getColor(status: CandidateStatus): string {
    const colorHex = STATUS_COLOR[status] || STATUS_COLOR[CandidateStatus.CREATED];
    return colorHex;
  }

  getShadowColor(color: string): any {
    return `0px 0px 0px 3px ${color}80`;
  }
}
