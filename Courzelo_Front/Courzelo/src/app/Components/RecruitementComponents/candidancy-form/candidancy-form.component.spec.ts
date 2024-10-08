import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidancyFormComponent } from './candidancy-form.component';

describe('CandidancyFormComponent', () => {
  let component: CandidancyFormComponent;
  let fixture: ComponentFixture<CandidancyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidancyFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidancyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
