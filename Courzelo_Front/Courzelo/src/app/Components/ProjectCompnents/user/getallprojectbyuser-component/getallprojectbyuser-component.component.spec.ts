import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallprojectbyuserComponentComponent } from './getallprojectbyuser-component.component';

describe('GetallprojectbyuserComponentComponent', () => {
  let component: GetallprojectbyuserComponentComponent;
  let fixture: ComponentFixture<GetallprojectbyuserComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetallprojectbyuserComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetallprojectbyuserComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
