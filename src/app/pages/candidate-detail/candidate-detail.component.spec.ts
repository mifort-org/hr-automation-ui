import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { StatusPipe } from '@utils/pipes/status.pipe';
import { CandidatesService } from '@services/candidates.service';
import { CandidateDetailComponent } from './candidate-detail.component';

describe('CandidateDetailComponent', () => {
  let component: CandidateDetailComponent;
  let fixture: ComponentFixture<CandidateDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateDetailComponent, StatusPipe],
      imports: [HttpClientTestingModule, MatMenuModule, MatDialogModule, RouterTestingModule],
      providers: [MatSnackBar, CandidatesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
