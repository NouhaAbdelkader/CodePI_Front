import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatejobOfferComponent } from './updatejob-offer.component';

describe('UpdatejobOfferComponent', () => {
  let component: UpdatejobOfferComponent;
  let fixture: ComponentFixture<UpdatejobOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatejobOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatejobOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
