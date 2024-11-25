import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConsumptionComponent} from '../../app/component/consumption/consumption.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('ConsumptionComponent', () => {
  let component: ConsumptionComponent;
  let fixture: ComponentFixture<ConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumptionComponent, NoopAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConsumptionComponent);
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
    it('should emit the form if the control values changed', () => {
      jest.spyOn(component.formValueChanged, 'emit');

      component.form.controls.frequencyNumber.setValue(20);

      expect(component.formValueChanged.emit).toHaveBeenCalledWith(component.form);
    });
  });

  it('should have title Consumption', () => {
    const titleElem = fixture.debugElement.query(By.css('h2'));

    expect(titleElem).toBeTruthy();
    expect(titleElem.nativeElement.textContent).toEqual('Consumption');
  });

  it('should display 2 radio groups', () => {
    expect(fixture.debugElement.queryAll(By.css('mat-radio-group')).length).toEqual(2);
  });

  describe('consumption type radio', () => {
    let radioGroupElem: DebugElement;

    beforeEach(() => {
      radioGroupElem = fixture.debugElement.query(By.css('.consumption-type'));
    });

    it('should be displayed', () => {
      expect(radioGroupElem).toBeTruthy();
    });

    it('should contain Accrual and Accumulative radio buttons', () => {
      const buttons = radioGroupElem.queryAll(By.css('mat-radio-button'));

      expect(buttons.length).toEqual(2);
      expect(buttons[0].nativeElement.textContent).toEqual('Accrual');
      expect(buttons[1].nativeElement.textContent).toEqual('Accumulative');
    });
  });

  describe('unused balance radio', () => {
    let radioGroupElem: DebugElement;

    beforeEach(() => {
      radioGroupElem = fixture.debugElement.queryAll(By.css('mat-radio-group'))[1];
    });

    it('should be displayed', () => {
      expect(radioGroupElem).toBeTruthy();
    });

    it('should contain Wave out, Cashement and Carry over radio buttons', () => {
      const buttons = radioGroupElem.queryAll(By.css('mat-radio-button'));

      expect(buttons.length).toEqual(3);
      expect(buttons[0].nativeElement.textContent).toEqual('Wave out');
      expect(buttons[1].nativeElement.textContent).toEqual('Cashement');
      expect(buttons[2].nativeElement.textContent).toEqual('Carry over');
    });
  });

  it('should contain frequency number mat form field', () => {
    const inputElem = fixture.debugElement.query(By.css('mat-form-field'));

    expect(inputElem).toBeTruthy();
  });
});
