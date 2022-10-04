import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from '@src/app/models/candidate';

@Component({
  selector: 'app-candidate-item',
  templateUrl: './candidate-item.component.html',
  styleUrls: ['./candidate-item.component.scss'],
})
export class CandidateItemComponent implements OnInit {
  @Input() candidate: Candidate | null = null;

  hasContacts: boolean = false;

  hasLocation: boolean = false;

  ngOnInit(): void {
    this.hasContacts = this.checkContacts();
    this.hasLocation = this.checkLocation();
  }

  checkContacts(): boolean {
    // if (!this.candidate?.contacts?.email && !this.candidate?.contacts?.phone) {
    //   return false;
    // }
    // return true;
    return Boolean(this.candidate?.contacts?.email || this.candidate?.contacts?.phone);
  }

  checkLocation(): boolean {
    //   if (!this.candidate?.city) {
    //     return false;
    //   }
    //   return true;
    // }
    return Boolean(this.candidate?.city);
  }
}
