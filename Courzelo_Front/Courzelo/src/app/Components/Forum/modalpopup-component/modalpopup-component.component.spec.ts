import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpopupComponentComponent } from './modalpopup-component.component';

describe('ModalpopupComponentComponent', () => {
  let component: ModalpopupComponentComponent;
  let fixture: ComponentFixture<ModalpopupComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalpopupComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalpopupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
