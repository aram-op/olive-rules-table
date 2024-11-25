import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDatepickerToggleIcon,
  MatDateRangeInput
} from '@angular/material/datepicker';
import {MatIcon} from '@angular/material/icon';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {BalanceCombinedInputComponent} from '../balance-combined-input/balance-combined-input.component';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatDatepicker,
    MatSelect,
    MatSuffix,
    MatOption,
    MatCheckbox,
    MatDateRangeInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatIcon,
    MatDatepickerToggleIcon,
    ReactiveFormsModule,
    BalanceCombinedInputComponent
  ],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent implements OnInit {
  //Based on this property the balance component will have additional fields
  @Input({required: true}) isThroughBalance!: boolean;
  @Output() formValueChanged = new EventEmitter();
  isExtendedBalanceDisabled$ = new BehaviorSubject(true);
  form = new FormGroup({
    balanceForm: new FormGroup({}),
    conditional: new FormControl(false),
    balanceCondition: new FormControl('greater'),
    balanceConditionsForm: new FormGroup({}),
    conditionalBalanceForm: new FormGroup({}),
    extendBalance: new FormControl(false),
    extendedBalanceForm: new FormGroup({}),
    canBeOverridden: new FormControl(false),
    frequency: new FormControl('yearly'),
    frequencyStart: new FormControl(new Date())
  });


  ngOnInit() {
    this.formValueChanged.emit(this.form);

    this.form.valueChanges.subscribe((values) => {
      if (values.extendBalance) {
        this.isExtendedBalanceDisabled$.next(false);
      } else {
        this.isExtendedBalanceDisabled$.next(true);
      }
      this.formValueChanged.emit(this.form);
    });
  }

  setBalanceForm(combinedInputForm: FormGroup) {
    this.form.controls.balanceForm = combinedInputForm;
  }

  setBalanceConditionsForm(combinedInputForm: FormGroup) {
    this.form.controls.balanceConditionsForm = combinedInputForm;
  }

  setConditionalBalanceForm(combinedInputForm: FormGroup) {
    this.form.controls.conditionalBalanceForm = combinedInputForm;
  }

  setExtendedBalanceForm(combinedInputForm: FormGroup) {
    this.form.controls.conditionalBalanceForm = combinedInputForm;
  }
}
