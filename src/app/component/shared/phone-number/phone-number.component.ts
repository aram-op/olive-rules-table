import {FocusMonitor} from '@angular/cdk/a11y';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl,} from '@angular/material/form-field';
import {Subject} from 'rxjs';
import {PhoneNumber} from '../../../model/phone-number.model';
import {MatOption, MatSelect, MatSelectTrigger} from '@angular/material/select';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'phone-number-input',
  templateUrl: './phone-number.component.html',
  styleUrl: './phone-number.component.css',
  providers: [{provide: MatFormFieldControl, useExisting: PhoneNumberInput}],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
  imports: [FormsModule, ReactiveFormsModule, MatSelect, MatOption, MatSelectTrigger, MatFormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class PhoneNumberInput implements ControlValueAccessor, MatFormFieldControl<string>, OnDestroy {
  static nextId = 0;
  readonly countryCodeInput = viewChild.required<MatSelect>('countryCode');
  readonly numberInput = viewChild.required<HTMLInputElement>('number');
  ngControl = inject(NgControl, {optional: true, self: true});
  readonly parts: FormGroup<{
    countryCode: FormControl<string | null>;
    number: FormControl<string | null>;
  }>;
  readonly stateChanges = new Subject<void>();
  readonly touched = signal(false);
  readonly controlType = 'phone-number-input';
  readonly id = `phone-number-input-${PhoneNumberInput.nextId++}`;
  readonly _userAriaDescribedBy = input<string>('', {alias: 'aria-describedby'});
  readonly _placeholder = input<string>('', {alias: 'placeholder'});
  readonly _required = input<boolean, unknown>(false, {
    alias: 'required',
    transform: booleanAttribute,
  });
  readonly _disabledByInput = input<boolean, unknown>(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });
  readonly _value = model<PhoneNumber | null>(null, {alias: 'value'});
  onChange = (_: any) => {
  };
  onTouched = () => {
  };

  protected readonly _formField = inject(MAT_FORM_FIELD, {
    optional: true,
  });

  private readonly _focused = signal(false);
  private readonly _disabledByCva = signal(false);
  private readonly _disabled = computed(() => this._disabledByInput() || this._disabledByCva());
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  get focused(): boolean {
    return this._focused();
  }

  get empty() {
    const {
      value: {countryCode, number},
    } = this.parts;

    return !countryCode && !number;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get userAriaDescribedBy() {
    return this._userAriaDescribedBy();
  }

  get placeholder(): string {
    return this._placeholder();
  }

  get required(): boolean {
    return this._required();
  }

  get disabled(): boolean {
    return this._disabled();
  }

  get value(): string | null {
    const countryCode = this._value()?.countryCode;
    const number = this._value()?.number;

    if (countryCode && number) {
      return countryCode + number;
    }
    return null;
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched();
  }

  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.parts = inject(FormBuilder).group({
      countryCode: ['+374'],
      number: ['']
    });

    effect(() => {
      this._placeholder();
      this._required();
      this._disabled();
      this._focused();
      untracked(() => this.stateChanges.next());
    });

    effect(() => {
      if (this._disabled()) {
        untracked(() => this.parts.disable());
      } else {
        untracked(() => this.parts.enable());
      }
    });

    effect(() => {
      const value = this._value() || new PhoneNumber('', '');
      untracked(() => this.parts.setValue(value));
    });

    this.parts.statusChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.stateChanges.next();
    });

    this.parts.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      const tel = this.parts.valid
        ? new PhoneNumber(
          this.parts.value.countryCode || '',
          this.parts.value.number || '',
        )
        : null;
      this._updateValue(tel);
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onFocusIn() {
    if (!this._focused()) {
      this._focused.set(true);
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched.set(true);
      this._focused.set(false);
      this.onTouched();
    }
  }

  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.phone-number-input-container',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
  }

  writeValue(phoneNumber: PhoneNumber | null): void {
    this._updateValue(phoneNumber);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }

  private _updateValue(phoneNumber: PhoneNumber | null) {
    const current = this._value();
    if (
      phoneNumber === current ||
      (phoneNumber?.countryCode === current?.countryCode &&
        phoneNumber?.number === current?.number)
    ) {
      return;
    }
    this._value.set(phoneNumber);
  }
}
