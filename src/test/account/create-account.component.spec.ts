import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateAccountComponent} from '../../app/component/accounts/create-account/create-account.component';
import {provideRouter} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;

  const expectedHeadings: Map<string, string> = new Map();
  expectedHeadings.set('../', 'Accounts Management');
  expectedHeadings.set('./', 'Create Account');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccountComponent, BrowserAnimationsModule, ReactiveFormsModule, FormsModule],
      providers: [provideRouter([])]

    }).compileComponents();

    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeTruthy();
  });

  it('should initialize the headings property', () => {
    expect(component.headings).toEqual(expectedHeadings);
  });

  it('should contain heading component and pass to it the headings property', () => {
    const headingComponent = fixture.debugElement.query(By.css('app-heading'));

    expect(headingComponent).toBeTruthy();

    fixture.whenStable().then(() => {
      expect(headingComponent.nativeElement.getAttribute('headings')).toEqual(expectedHeadings);
    });
  });

  describe('.onSubmit()', () => {
    beforeEach(() => {
      const form = fixture.debugElement.query(By.css('form'));

      jest.spyOn(component, 'onSubmit');

      form.triggerEventHandler('submit');
    });

    test('if it executes when the form is submitted', () => {
      expect(component.onSubmit).toHaveBeenCalled();
    });
  });
});
