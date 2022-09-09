import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActionsBarMergeComponent } from './actions-bar-merge.component';

describe('ActionsBarMergeComponent', () => {
  let component: ActionsBarMergeComponent;
  let fixture: ComponentFixture<ActionsBarMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsBarMergeComponent],
      imports: [HttpClientTestingModule, MatMenuModule],
      providers: [MatSnackBar],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsBarMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
