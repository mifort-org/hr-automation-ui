import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import { AttributesService, AttributeTypeDto } from '@services/attributes.service';
import { AttributeType } from '@src/app/models/attributeType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
class AppComponent implements OnInit, OnDestroy {
  public unSubscribe$: Subject<void> = new Subject<void>();

  constructor(private _attributeService: AttributesService) {}

  ngOnInit(): void {
    this._attributeService
      .getAllAttributes()
      .pipe(
        takeUntil(this.unSubscribe$),
        map((data: AttributeTypeDto[]) =>
          data.map(this._attributeService.mapAllAttributes.bind(this))
        )
      )
      .subscribe({
        next: (resolve: AttributeType[]) => {
          this._attributeService.handleResponse(resolve);
        },
      });
  }

  ngOnDestroy() {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}

export default AppComponent;
