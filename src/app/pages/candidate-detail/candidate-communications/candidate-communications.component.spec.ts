import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCommunicationsComponent } from './candidate-communications.component';

describe('CandidateCommunicationsComponent', () => {
  let component: CandidateCommunicationsComponent;
  let fixture: ComponentFixture<CandidateCommunicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateCommunicationsComponent],
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
