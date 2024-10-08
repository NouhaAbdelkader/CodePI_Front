import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCandidancyComponent } from './update-candidancy.component';

describe('UpdateCandidancyComponent', () => {
  let component: UpdateCandidancyComponent;
  let fixture: ComponentFixture<UpdateCandidancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCandidancyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCandidancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
