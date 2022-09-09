import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MergePageComponent } from './merge-page.component';

describe('MergePageComponent', () => {
  let component: MergePageComponent;
  let fixture: ComponentFixture<MergePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MergePageComponent],
      imports: [HttpClientTestingModule, MatMenuModule],
      providers: [MatSnackBar],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
