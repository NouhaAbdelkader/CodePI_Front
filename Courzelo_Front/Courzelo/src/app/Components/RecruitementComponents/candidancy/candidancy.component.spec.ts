import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidancyComponent } from './candidancy.component';

describe('CandidancyComponent', () => {
  let component: CandidancyComponent;
  let fixture: ComponentFixture<CandidancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidancyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
