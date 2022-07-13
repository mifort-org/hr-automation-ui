import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationCommentComponent } from './communication-comment.component';

describe('CommunicationCommentComponent', () => {
  let component: CommunicationCommentComponent;
  let fixture: ComponentFixture<CommunicationCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunicationCommentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
