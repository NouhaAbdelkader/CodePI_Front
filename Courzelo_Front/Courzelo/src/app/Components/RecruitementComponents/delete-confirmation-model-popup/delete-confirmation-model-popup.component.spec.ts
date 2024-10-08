import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationModelPopupComponent } from './delete-confirmation-model-popup.component';

describe('DeleteConfirmationModelPopupComponent', () => {
  let component: DeleteConfirmationModelPopupComponent;
  let fixture: ComponentFixture<DeleteConfirmationModelPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfirmationModelPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmationModelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
