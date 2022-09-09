import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CandidateDetailService } from '@services/candidate-detail.service';
import { CandidateMainInfoComponent } from './candidate-main-info.component';

describe('CandidateMainInfoComponent', () => {
  let component: CandidateMainInfoComponent;
  let fixture: ComponentFixture<CandidateMainInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateMainInfoComponent],
      imports: [HttpClientTestingModule, MatMenuModule, MatDialogModule, RouterTestingModule],
      providers: [CandidateDetailService, MatSnackBar],
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
