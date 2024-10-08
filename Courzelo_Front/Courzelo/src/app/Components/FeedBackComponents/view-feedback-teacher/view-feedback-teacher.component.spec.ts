import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeedbackTeacherComponent } from './view-feedback-teacher.component';

describe('ViewFeedbackTeacherComponent', () => {
  let component: ViewFeedbackTeacherComponent;
  let fixture: ComponentFixture<ViewFeedbackTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFeedbackTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFeedbackTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
