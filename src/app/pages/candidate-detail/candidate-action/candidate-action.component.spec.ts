import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CandidateActionComponent } from './candidate-action.component';

describe('CandidateActionComponent', () => {
  let component: CandidateActionComponent;
  let fixture: ComponentFixture<CandidateActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateActionComponent],
      imports: [MatDialogModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
