import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsStatisticsComponent } from './rewards-statistics.component';

describe('RewardsStatisticsComponent', () => {
  let component: RewardsStatisticsComponent;
  let fixture: ComponentFixture<RewardsStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardsStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
