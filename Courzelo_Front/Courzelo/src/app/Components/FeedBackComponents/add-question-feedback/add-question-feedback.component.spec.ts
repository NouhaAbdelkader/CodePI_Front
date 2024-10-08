import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionFeedbackComponent } from './add-question-feedback.component';

describe('AddQuestionFeedbackComponent', () => {
  let component: AddQuestionFeedbackComponent;
  let fixture: ComponentFixture<AddQuestionFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestionFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
