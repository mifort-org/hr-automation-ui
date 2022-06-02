import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-candidate-communications',
  templateUrl: './candidate-communications.component.html',
})
export class CandidateCommunicationsComponent {
  @Input() candidate!: any;
}
