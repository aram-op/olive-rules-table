import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateLeaveTypeComponent} from '../../app/pages/create-leave-type/create-leave-type.component';
import {ActivatedRoute, provideRouter, Router} from '@angular/router';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {provideNativeDateAdapter} from '@angular/material/core';

describe('CreateLeaveTypeComponent', () => {
  let component: CreateLeaveTypeComponent;
  let fixture: ComponentFixture<CreateLeaveTypeComponent>;
  let router: Router;
  const mockRoute = {params: of({ruleId: '1'})};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLeaveTypeComponent, NoopAnimationsModule],
      providers: [
        provideNativeDateAdapter(),
        provideRouter([]),
        {provide: ActivatedRoute, useValue: mockRoute}
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(CreateLeaveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeTruthy();
  });

  describe('.ngOnInit()', () => {
    it('should find and set the rule by id provided as query param', () => {
      expect(component.rule).toEqual({
        id: '1',
        name: 'Leave Types',
        module: 'Leaves',
        country: 'USA',
        countryImgUrl: 'assets/country-flags/flag-usa.png',
        status: 'Draft',
        leaveIds: ['1', '2', '3', '4', '5']
      });
    });

    it('should display the date range if validity is limited', () => {
      component.form.controls.validity.setValue('limited');
      fixture.detectChanges();

      expect(component.isDateRangeDisplayed).toEqual(true);
      expect(fixture.debugElement.query(By.css('.date-range-container'))).toBeTruthy();

      component.form.controls.validity.setValue('unlimited');
      fixture.detectChanges();

      expect(component.isDateRangeDisplayed).toEqual(false);
      expect(fixture.debugElement.query(By.css('.date-range-container'))).toBeFalsy();
    });

    it('should display both balance and consumption forms if Entitled value is "through balance"', () => {
      component.form.controls.entitled.setValue('through-balance');
      fixture.detectChanges();

      expect(component.isBalanceDisplayed).toEqual(true);
      expect(component.isConsumptionDisplayed).toEqual(true);
      expect(component.isThroughBalance).toEqual(true);

      fixture.whenStable().then(() => {
        expect(fixture.debugElement.query(By.css('app-balance'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('app-consumption'))).toBeTruthy();
      });

      component.form.controls.entitled.setValue('event-based');
      fixture.detectChanges();

      expect(component.isBalanceDisplayed).toEqual(true);
      expect(component.isConsumptionDisplayed).toEqual(false);
      expect(component.isThroughBalance).toEqual(false);

      fixture.whenStable().then(() => {
        expect(fixture.debugElement.query(By.css('app-balance'))).toBeFalsy();
        expect(fixture.debugElement.query(By.css('app-consumption'))).toBeFalsy();
      });
    });

    describe('if the type field value is "not-paid"', () => {
      beforeEach(() => {
        component.form.controls.type.setValue('not-paid');
        fixture.detectChanges();
      });

      it('should unselect the entitled field', () => {
        expect(component.form.controls.entitled.value).toEqual('');
      });

      it('should disable the entitled field', () => {
        expect(component.form.controls.entitled.disabled).toEqual(true);
      });

      it('should not display the balance form', () => {
        expect(component.isBalanceDisplayed).toEqual(false);

        fixture.whenStable().then(() => {
          expect(fixture.debugElement.query(By.css('app-balance'))).toBeFalsy();
        });
      });

      it('should not display the consumption form', () => {
        expect(component.isConsumptionDisplayed).toEqual(false);

        fixture.whenStable().then(() => {
          expect(fixture.debugElement.query(By.css('app-consumption'))).toBeFalsy();
        });
      });
    });
  });

  describe('.onSubmit()', () => {
    beforeEach(() => {
      const buttonElem = fixture.debugElement.query(By.css('.create-button'));

      jest.spyOn(component, 'onSubmit');

      buttonElem.triggerEventHandler('click');
    });

    test('if it is called after the user clicks on Create button', () => {
      expect(component.onSubmit).toHaveBeenCalled();
    });
  });

  describe('.onCancel()', () => {
    beforeEach(() => {
      const buttonElem = fixture.debugElement.query(By.css('.cancel-button'));

      jest.spyOn(component, 'onCancel');
      jest.spyOn(router, 'navigate').mockImplementation(() => new Promise(() => {
      }));

      buttonElem.triggerEventHandler('click');
    });

    test('if it is called after the user clicks on Create button', () => {
      expect(component.onCancel).toHaveBeenCalled();
    });

    it('should call the .navigate() of Router', () => {
      expect(router.navigate).toHaveBeenCalledWith(['../'], {relativeTo: mockRoute});
    });
  });
});
