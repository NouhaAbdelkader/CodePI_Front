import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallmoduleComponent } from './getallmodule.component';

describe('GetallmoduleComponent', () => {
  let component: GetallmoduleComponent;
  let fixture: ComponentFixture<GetallmoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetallmoduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetallmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
