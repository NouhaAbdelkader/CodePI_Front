import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedbackModuleComponent } from './add-feedback-module.component';

describe('AddFeedbackModuleComponent', () => {
  let component: AddFeedbackModuleComponent;
  let fixture: ComponentFixture<AddFeedbackModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeedbackModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeedbackModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
