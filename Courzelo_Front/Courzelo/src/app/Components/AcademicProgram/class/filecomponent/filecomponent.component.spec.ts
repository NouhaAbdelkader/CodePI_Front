import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilecomponentComponent } from './filecomponent.component';

describe('FilecomponentComponent', () => {
  let component: FilecomponentComponent;
  let fixture: ComponentFixture<FilecomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilecomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
