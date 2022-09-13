import { Component, Input, OnInit } from '@angular/core';
import { CandidateStatus } from '@src/app/constants/candidates';
import { Candidate } from '@src/app/models/candidate';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() candidate: Candidate | undefined;

  initials: string = '';
  selectedColor: string = '';
  colors = ['red', 'green', 'blue'];
  imageExists: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.getColor(this.candidate!.status);
    this.getInitials(this.candidate!.fullName);
    // this.checkForImage(this.candidate);
  }

  getInitials(par: string): void {
    let fullName = par.split(' ');
    let initials = fullName.shift()!.charAt(0) + fullName.pop()!.charAt(0);
    this.initials = initials.toUpperCase();
  }

  getColor(par: CandidateStatus):any {
    switch (par) {
      case CandidateStatus.UNEMPLOYED:
        return this.selectedColor = this.colors[0];
      case CandidateStatus.EMPLOYED:
        return this.selectedColor = this.colors[1];
      case CandidateStatus.CREATED:
        return this.selectedColor = this.colors[2];
    }
  }

  // checkForImage(par: Candidate): void {
  //   if (par.img)
  //     this.imageExists = true;
  // }
}
