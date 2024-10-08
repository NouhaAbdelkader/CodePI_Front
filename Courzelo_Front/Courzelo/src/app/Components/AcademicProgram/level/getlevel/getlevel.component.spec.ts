import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetlevelComponent } from './getlevel.component';

describe('GetlevelComponent', () => {
  let component: GetlevelComponent;
  let fixture: ComponentFixture<GetlevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetlevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetlevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
