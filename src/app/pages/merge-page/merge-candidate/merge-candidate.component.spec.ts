import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MergeCandidateComponent } from './merge-candidate.component';

describe('MergeCandidateComponent', () => {
  let component: MergeCandidateComponent;
  let fixture: ComponentFixture<MergeCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MergeCandidateComponent],
      imports: [HttpClientTestingModule, MatMenuModule],
      providers: [MatSnackBar],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
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
