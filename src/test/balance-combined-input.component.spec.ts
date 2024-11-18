import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceCombinedInputComponent } from '../app/component/balance-combined-input/balance-combined-input.component';

describe('CombinedInputComponent', () => {
  let component: BalanceCombinedInputComponent;
  let fixture: ComponentFixture<BalanceCombinedInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceCombinedInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceCombinedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
