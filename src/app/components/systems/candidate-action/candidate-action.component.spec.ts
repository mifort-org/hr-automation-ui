import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateActionComponent } from './candidate-action.component';

describe('CandidateActionComponent', () => {
  let component: CandidateActionComponent;
  let fixture: ComponentFixture<CandidateActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateActionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
