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
    return !!this.candidate?.contacts?.email || !!this.candidate?.contacts?.phone;
  }

  checkLocation(): boolean {
    return !!this.candidate?.city;
  }
}
