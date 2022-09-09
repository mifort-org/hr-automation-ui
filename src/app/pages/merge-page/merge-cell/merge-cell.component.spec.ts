import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MergeCellComponent } from './merge-cell.component';

describe('CandidateMergeComponent', () => {
  let component: MergeCellComponent;
  let fixture: ComponentFixture<MergeCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MergeCellComponent],
      imports: [HttpClientTestingModule, MatMenuModule],
      providers: [MatSnackBar],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
