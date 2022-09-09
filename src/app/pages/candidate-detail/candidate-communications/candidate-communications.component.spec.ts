import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CandidateDetailService } from '@services/candidate-detail.service';
import { CandidateCommunicationsComponent } from './candidate-communications.component';

describe('CandidateCommunicationsComponent', () => {
  let component: CandidateCommunicationsComponent;
  let fixture: ComponentFixture<CandidateCommunicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateCommunicationsComponent],
      imports: [HttpClientTestingModule, MatMenuModule, MatDialogModule, RouterTestingModule],
      providers: [CandidateDetailService, MatSnackBar],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCommunicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
