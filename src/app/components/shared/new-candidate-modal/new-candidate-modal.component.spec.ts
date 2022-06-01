import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCandidateModalComponent } from './new-candidate-modal.component';

describe('NewCandidateModalComponent', () => {
  let component: NewCandidateModalComponent;
  let fixture: ComponentFixture<NewCandidateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewCandidateModalComponent],
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
