import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesFilterComponent } from './candidates-filter.component';

describe('CandidatesFilterComponent', () => {
  let component: CandidatesFilterComponent;
  let fixture: ComponentFixture<CandidatesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidatesFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
