import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceComponent } from '../../app/component/rules-engine/balance/balance.component';
import {provideNativeDateAdapter} from '@angular/material/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceComponent, NoopAnimationsModule],
      providers: [provideNativeDateAdapter()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceComponent);
    fixture.componentRef.setInput('isThroughBalance', true);
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
    it('should emit the form on value changes', () => {
      jest.spyOn(component.formValueChanged, 'emit');

      component.form.controls.frequency.setValue('10');

      expect(component.formValueChanged.emit).toHaveBeenCalledWith(component.form);
    });
  });

  describe('if is through balance', () => {
    it('should display all form controls', () => {
      fixture.componentRef.setInput('isThroughBalance', true);

      const controls = fixture.debugElement.queryAll(By.css('mat-form-field, mat-checkbox'));

      expect(controls.length).toEqual(14);
    });
  });

  describe('if is event based', () => {
    it('should display only 6 form controls', () => {
      fixture = TestBed.createComponent(BalanceComponent);
      fixture.componentRef.setInput('isThroughBalance', false);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const controls = fixture.debugElement.queryAll(By.css('mat-form-field, mat-checkbox'));

      expect(controls.length).toEqual(6);
    });
  });
});
