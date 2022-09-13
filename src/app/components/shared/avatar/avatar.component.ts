import { Component, Input, OnInit } from '@angular/core';
import { CandidateStatus } from '@src/app/constants/candidates';
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

  colors = ['red', 'green', 'blue'];

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
    switch (par) {
      case CandidateStatus.UNEMPLOYED:
        // eslint-disable-next-line prefer-destructuring
        this.selectedColor = this.colors[0];
        break;
      case CandidateStatus.EMPLOYED:
        // eslint-disable-next-line prefer-destructuring
        this.selectedColor = this.colors[1];
        break;
      case CandidateStatus.CREATED:
        // eslint-disable-next-line prefer-destructuring, no-magic-numbers
        this.selectedColor = this.colors[2];
        break;
      default:
        // eslint-disable-next-line prefer-destructuring, no-magic-numbers
        this.selectedColor = this.colors[2];
        break;
    }
  }

  // checkForImage(par: Candidate): void {
  //   if (par.img)
  //     this.imageExists = true;
  // }
}
