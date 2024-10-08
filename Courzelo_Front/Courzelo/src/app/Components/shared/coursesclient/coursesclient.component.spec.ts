import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesclientComponent } from './coursesclient.component';

describe('CoursesclientComponent', () => {
  let component: CoursesclientComponent;
  let fixture: ComponentFixture<CoursesclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
