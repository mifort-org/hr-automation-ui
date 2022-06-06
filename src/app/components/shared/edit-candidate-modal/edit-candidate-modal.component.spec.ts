import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCandidateModalComponent } from './edit-candidate-modal.component';

describe('EditCandidateModalComponent', () => {
  let component: EditCandidateModalComponent;
  let fixture: ComponentFixture<EditCandidateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCandidateModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCandidateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
