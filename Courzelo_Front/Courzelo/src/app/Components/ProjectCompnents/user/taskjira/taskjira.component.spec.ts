import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskjiraComponent } from './taskjira.component';

describe('TaskjiraComponent', () => {
  let component: TaskjiraComponent;
  let fixture: ComponentFixture<TaskjiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskjiraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskjiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
