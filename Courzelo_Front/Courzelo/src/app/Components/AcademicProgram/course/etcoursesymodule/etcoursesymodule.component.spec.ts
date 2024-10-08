import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtcoursesymoduleComponent } from './etcoursesymodule.component';

describe('EtcoursesymoduleComponent', () => {
  let component: EtcoursesymoduleComponent;
  let fixture: ComponentFixture<EtcoursesymoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtcoursesymoduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtcoursesymoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
