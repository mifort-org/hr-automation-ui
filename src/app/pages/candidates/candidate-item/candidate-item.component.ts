import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from '@src/app/models/candidate';

@Component({
  selector: 'app-candidate-item',
  templateUrl: './candidate-item.component.html',
  styleUrls: ['./candidate-item.component.scss'],
})
export class CandidateItemComponent implements OnInit {
  @Input() candidate: Candidate | null = null;

  contacts: boolean = false;

  location: boolean = false;

  ngOnInit(): void {
    this.contacts = this.checkContacts();
    this.location = this.checkLocation();
  }

  checkContacts(): boolean {
    if (!this.candidate?.contacts?.email && !this.candidate?.contacts?.phone) {
      return false;
    }
    return true;
  }

  checkLocation(): boolean {
    if (!this.candidate?.city) {
      return false;
    }
    return true;
  }
}
