import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { AttributesService } from '@services/attributes.service';
import { Attribute } from '@src/app/models/attributeType';
import { SidenavService } from '@services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
class AppComponent implements OnInit, OnDestroy {
  public isExpanded: boolean = false;

  public mobileQuery!: MediaQueryList;

  private mobileQueryListener!: () => void;

  private unSubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private _attributeService: AttributesService,
    private sidenavService: SidenavService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {}

  public ngOnInit(): void {
    this._attributeService
      .getAllAttributes()
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: (resolve: Attribute[]) => {
          this._attributeService.handleResponse(resolve);
        },
      });

    this.isExpanded = this.sidenavService.getSidenavStatus();
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  public updateExpandedStatus(isExpanded: boolean): void {
    this.isExpanded = isExpanded;

    this.sidenavService.saveSidenavStatus(isExpanded);
  }

  public ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();

    this.mobileQuery?.removeListener(this.mobileQueryListener);
  }
}

export default AppComponent;
