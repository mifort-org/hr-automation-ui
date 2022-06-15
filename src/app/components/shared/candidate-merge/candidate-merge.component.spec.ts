import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateMergeComponent } from './candidate-merge.component';

describe('CandidateMergeComponent', () => {
  let component: CandidateMergeComponent;
  let fixture: ComponentFixture<CandidateMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateMergeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
