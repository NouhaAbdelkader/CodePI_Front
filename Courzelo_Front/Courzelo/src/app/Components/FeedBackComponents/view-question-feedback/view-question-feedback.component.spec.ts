import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestionFeedbackComponent } from './view-question-feedback.component';

describe('ViewQuestionFeedbackComponent', () => {
  let component: ViewQuestionFeedbackComponent;
  let fixture: ComponentFixture<ViewQuestionFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuestionFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuestionFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
