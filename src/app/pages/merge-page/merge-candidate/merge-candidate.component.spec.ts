import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeCandidateComponent } from './merge-candidate.component';

describe('CandidateMergeComponent', () => {
  let component: MergeCandidateComponent;
  let fixture: ComponentFixture<MergeCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MergeCandidateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
