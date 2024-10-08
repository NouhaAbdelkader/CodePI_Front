import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvGuideComponent } from './ev-guide.component';

describe('EvGuideComponent', () => {
  let component: EvGuideComponent;
  let fixture: ComponentFixture<EvGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
