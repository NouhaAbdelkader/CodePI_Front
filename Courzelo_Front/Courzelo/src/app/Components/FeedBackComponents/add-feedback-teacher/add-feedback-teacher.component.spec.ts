import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedbackTeacherComponent } from './add-feedback-teacher.component';

describe('AddFeedbackTeacherComponent', () => {
  let component: AddFeedbackTeacherComponent;
  let fixture: ComponentFixture<AddFeedbackTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeedbackTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeedbackTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
