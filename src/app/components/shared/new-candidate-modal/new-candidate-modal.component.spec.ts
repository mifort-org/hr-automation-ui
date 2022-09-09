import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CandidatesService } from '@services/candidates.service';
import { NewCandidateModalComponent } from './new-candidate-modal.component';

describe('NewCandidateModalComponent', () => {
  let component: NewCandidateModalComponent;
  let fixture: ComponentFixture<NewCandidateModalComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatMenuModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [NewCandidateModalComponent],
      providers: [
        MatDialog,
        MatSnackBar,
        CandidatesService,
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCandidateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
