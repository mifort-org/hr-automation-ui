import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidate-action',
  templateUrl: './candidate-action.component.html',
})
export class CandidateActionComponent implements OnInit {
  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.fragment.subscribe((f) => {
      const element = document.querySelector(`#${f}`);
      if (element) element.scrollIntoView();
    });
  }
}
