import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatelevelComponent } from './updatelevel.component';

describe('UpdatelevelComponent', () => {
  let component: UpdatelevelComponent;
  let fixture: ComponentFixture<UpdatelevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatelevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatelevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
