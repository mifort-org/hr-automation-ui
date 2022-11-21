import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AttributesService } from '@services/attributes.service';
import { Attribute } from '@src/app/models/attributeType';

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
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: (resolve: Attribute[]) => {
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
