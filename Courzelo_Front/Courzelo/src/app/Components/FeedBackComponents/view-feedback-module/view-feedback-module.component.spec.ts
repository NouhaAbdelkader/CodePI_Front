import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeedbackModuleComponent } from './view-feedback-module.component';

describe('ViewFeedbackModuleComponent', () => {
  let component: ViewFeedbackModuleComponent;
  let fixture: ComponentFixture<ViewFeedbackModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFeedbackModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFeedbackModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
