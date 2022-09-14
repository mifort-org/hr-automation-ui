import { Component, Input, OnInit } from '@angular/core';
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

  selectedColor: string = '';

  shadowColor: string = '';

  imageExists: boolean = false;

  ngOnInit(): void {
    this.getColor(this.candidate!.status);
    this.getInitials(this.candidate!.fullName);
    // this.checkForImage(this.candidate);
  }

  getInitials(par: string): void {
    const fullName = par.split(' ');
    const initials = fullName.shift()!.charAt(0) + fullName.pop()!.charAt(0);
    this.initials = initials.toUpperCase();
  }

  getColor(par: CandidateStatus): any {
    this.selectedColor = STATUS_COLOR[par] || STATUS_COLOR[CandidateStatus.CREATED];
    this.getShadowColor(this.selectedColor);
  }

  getShadowColor(par: string) {
    const withoutCommas = par.replace(/,/g, '');
    const stringArray = withoutCommas.split(' ');
    const modifiedArray = stringArray.slice(0, stringArray.length - 1);
    this.shadowColor = `0px 0px 0px 3px ${modifiedArray.toString()},0.5)`;
  }

  // checkForImage(par: Candidate): void {
  //   if (par.img)
  //     this.imageExists = true;
  // }
}
