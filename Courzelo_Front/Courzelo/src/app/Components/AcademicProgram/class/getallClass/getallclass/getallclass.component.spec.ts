import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallclassComponent } from './getallclass.component';

describe('GetallclassComponent', () => {
  let component: GetallclassComponent;
  let fixture: ComponentFixture<GetallclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetallclassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetallclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
