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
}

export default AppComponent;
