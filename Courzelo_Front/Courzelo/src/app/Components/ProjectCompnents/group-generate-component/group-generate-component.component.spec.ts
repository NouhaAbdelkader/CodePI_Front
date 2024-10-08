import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupGenerateComponentComponent } from './group-generate-component.component';

describe('GroupGenerateComponentComponent', () => {
  let component: GroupGenerateComponentComponent;
  let fixture: ComponentFixture<GroupGenerateComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupGenerateComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupGenerateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
