import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyBlockComponent } from './empty-block.component';

describe('EmptyBlockComponent', () => {
  let component: EmptyBlockComponent;
  let fixture: ComponentFixture<EmptyBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyBlockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
