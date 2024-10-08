import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallcoursesComponent } from './getallcourses.component';

describe('GetallcoursesComponent', () => {
  let component: GetallcoursesComponent;
  let fixture: ComponentFixture<GetallcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetallcoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetallcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
