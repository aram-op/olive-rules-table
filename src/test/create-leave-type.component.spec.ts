import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeaveTypeComponent } from '../app/component/create-leave-type/create-leave-type.component';

describe('CreateLeaveTypeComponent', () => {
  let component: CreateLeaveTypeComponent;
  let fixture: ComponentFixture<CreateLeaveTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLeaveTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLeaveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
