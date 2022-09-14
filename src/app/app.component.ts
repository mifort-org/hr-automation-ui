import { Component, OnInit } from '@angular/core';
import { AttributesService } from '@services/attributes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
class AppComponent implements OnInit {
  constructor(private _attributeService: AttributesService) {}

  ngOnInit(): void {
    this._attributeService.getAllAttributes();
  }

  currCandidate: any = {
    id: 'artem_skrebets',
    lastContact: '2022-02-11T13:44:33.000+00:00',
    status: 'created',
    firstName: 'nano',
    lastName: 'kiq',
  };
}

export default AppComponent;
