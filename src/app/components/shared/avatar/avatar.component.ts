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
    this.getColor(this.candidate!.status);
    this.getInitials(this.candidate?.firstName!, this.candidate?.lastName!);
  }

  getInitials(name: string, surname: string): void {
    if (name && surname) {
      const [firstNameInitial] = name;
      const [lastNameInitial] = surname;
      this.initials = (firstNameInitial + lastNameInitial).toLocaleUpperCase();
    }
  }

  getColor(par: CandidateStatus): any {
    this.selectedColor = STATUS_COLOR[par] || STATUS_COLOR[CandidateStatus.CREATED];
    this.getShadowColor(this.selectedColor);
  }

  getShadowColor(color: string) {
    const withoutCommas = color.replace(/,/g, '');
    const stringArray = withoutCommas.split(' ');
    const modifiedArray = stringArray.slice(0, stringArray.length - 1);
    this.shadowColor = `0px 0px 0px 3px ${modifiedArray.toString()},0.5)`;
  }
}
