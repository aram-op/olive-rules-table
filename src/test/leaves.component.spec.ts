import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTypesComponent } from '../app/component/leave-types/leave-types.component';

describe('LeavesComponent', () => {
  let component: LeaveTypesComponent;
  let fixture: ComponentFixture<LeaveTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
