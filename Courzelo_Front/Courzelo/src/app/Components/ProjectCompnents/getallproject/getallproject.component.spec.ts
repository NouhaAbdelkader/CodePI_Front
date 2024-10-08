import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallprojectComponent } from './getallproject.component';

describe('GetallprojectComponent', () => {
  let component: GetallprojectComponent;
  let fixture: ComponentFixture<GetallprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetallprojectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetallprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
