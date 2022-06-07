import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateUpdatesComponent } from './candidate-updates.component';

describe('CandidateUpdatesComponent', () => {
  let component: CandidateUpdatesComponent;
  let fixture: ComponentFixture<CandidateUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateUpdatesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
