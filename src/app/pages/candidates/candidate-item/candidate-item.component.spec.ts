import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { StatusPipe } from '@utils/pipes/status.pipe';
import { CandidateItemComponent } from './candidate-item.component';

describe('CandidateItemComponent', () => {
  let component: CandidateItemComponent;
  let fixture: ComponentFixture<CandidateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateItemComponent, StatusPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
