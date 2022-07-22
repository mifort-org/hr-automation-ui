import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeCellComponent } from './merge-cell.component';

describe('CandidateMergeComponent', () => {
  let component: MergeCellComponent;
  let fixture: ComponentFixture<MergeCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MergeCellComponent],
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
