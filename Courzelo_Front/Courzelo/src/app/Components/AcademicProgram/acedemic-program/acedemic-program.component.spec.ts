import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcedemicProgramComponent } from './acedemic-program.component';

describe('AcedemicProgramComponent', () => {
  let component: AcedemicProgramComponent;
  let fixture: ComponentFixture<AcedemicProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcedemicProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcedemicProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
