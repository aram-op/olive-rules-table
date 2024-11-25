import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
  BalanceCombinedInputComponent
} from '../../app/component/balance-combined-input/balance-combined-input.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BehaviorSubject} from 'rxjs';

describe('CombinedInputComponent', () => {
  let component: BalanceCombinedInputComponent;
  let fixture: ComponentFixture<BalanceCombinedInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceCombinedInputComponent, NoopAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BalanceCombinedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeTruthy();
  });

  describe('.ngOnInit()', () => {
    beforeEach(() => {
      jest.spyOn(component.formValueChanged, 'emit');

      component.form.controls.amount.setValue('12');
    });

    it('should emit the form when the values changed', () => {
      expect(component.formValueChanged.emit).toHaveBeenCalledWith(component.form);
    });

    it('should disable/enable the form controls based on isDisabled$ input value', () => {
      component.isDisabled$ = new BehaviorSubject(true);

      component.ngOnInit();

      expect(component.form.controls.amount.disabled).toEqual(true);
      expect(component.form.controls.timeOptions.disabled).toEqual(true);

      component.isDisabled$.next(false);

      expect(component.form.controls.amount.disabled).toEqual(false);
      expect(component.form.controls.timeOptions.disabled).toEqual(false);
    });
  });
});
