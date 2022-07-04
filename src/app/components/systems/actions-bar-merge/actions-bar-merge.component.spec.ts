import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsBarMergeComponent } from './actions-bar-merge.component';

describe('ActionsBarComponent', () => {
  let component: ActionsBarMergeComponent;
  let fixture: ComponentFixture<ActionsBarMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsBarMergeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsBarMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
