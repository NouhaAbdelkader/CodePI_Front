import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarOUTComponent } from './nav-bar-out.component';

describe('NavBarOUTComponent', () => {
  let component: NavBarOUTComponent;
  let fixture: ComponentFixture<NavBarOUTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarOUTComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarOUTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
