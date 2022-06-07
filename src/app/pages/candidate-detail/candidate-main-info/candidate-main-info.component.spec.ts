import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateMainInfoComponent } from './candidate-main-info.component';

describe('CandidateMainInfoComponent', () => {
  let component: CandidateMainInfoComponent;
  let fixture: ComponentFixture<CandidateMainInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateMainInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateMainInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
