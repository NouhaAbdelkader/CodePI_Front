import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetproandaccessmoduleComponent } from './getproandaccessmodule.component';

describe('GetproandaccessmoduleComponent', () => {
  let component: GetproandaccessmoduleComponent;
  let fixture: ComponentFixture<GetproandaccessmoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetproandaccessmoduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetproandaccessmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
