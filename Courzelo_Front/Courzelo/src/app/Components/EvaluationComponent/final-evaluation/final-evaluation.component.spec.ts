import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalEvaluationComponent } from './final-evaluation.component';

describe('FinalEvaluationComponent', () => {
  let component: FinalEvaluationComponent;
  let fixture: ComponentFixture<FinalEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
