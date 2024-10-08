import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOptionsDialogComponent } from './test-options-dialog.component';

describe('TestOptionsDialogComponent', () => {
  let component: TestOptionsDialogComponent;
  let fixture: ComponentFixture<TestOptionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestOptionsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
