import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilPrimComponent } from './acceuil-prim.component';

describe('AcceuilPrimComponent', () => {
  let component: AcceuilPrimComponent;
  let fixture: ComponentFixture<AcceuilPrimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceuilPrimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceuilPrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
