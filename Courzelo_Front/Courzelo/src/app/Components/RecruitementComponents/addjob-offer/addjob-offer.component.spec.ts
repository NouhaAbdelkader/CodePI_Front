import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddjobOfferComponent } from './addjob-offer.component';

describe('AddjobOfferComponent', () => {
  let component: AddjobOfferComponent;
  let fixture: ComponentFixture<AddjobOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddjobOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddjobOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
