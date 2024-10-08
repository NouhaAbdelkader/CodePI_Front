import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCorzeloComponent } from './user-corzelo.component';

describe('UserCorzeloComponent', () => {
  let component: UserCorzeloComponent;
  let fixture: ComponentFixture<UserCorzeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCorzeloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCorzeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
