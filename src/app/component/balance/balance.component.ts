import {Component, Input, OnInit} from '@angular/core';
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
    ReactiveFormsModule
  ],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent implements OnInit {
  @Input({required: true}) isThroughBalance!: boolean;
  balanceForm = new FormGroup({
    balanceNumber: new FormControl(''),
    balanceType: new FormControl('day'),
    conditional: new FormControl(false),
    balanceCondition: new FormControl('greater'),
    balanceConditionsNumber: new FormControl(''),
    balanceConditionsType: new FormControl('year'),
    conditionalBalanceNumber: new FormControl(''),
    conditionalBalanceType: new FormControl('day'),
    extendBalance: new FormControl(false),
    extendedBalanceNumber: new FormControl(''),
    extendedBalanceType: new FormControl('day'),
    canBeOverridden: new FormControl(false),
    frequency: new FormControl('yearly'),
    frequencyStart: new FormControl(new Date())
  });


  ngOnInit() {
    this.balanceForm.controls.extendedBalanceNumber.disable();
    this.balanceForm.controls.extendedBalanceType.disable();


    this.balanceForm.valueChanges.subscribe((values) => {
      if (values.extendBalance) {
        this.balanceForm.controls.extendedBalanceNumber.enable({emitEvent: false});
        this.balanceForm.controls.extendedBalanceType.enable({emitEvent: false});
      } else {
        this.balanceForm.controls.extendedBalanceNumber.disable({emitEvent: false});
        this.balanceForm.controls.extendedBalanceType.disable({emitEvent: false});
      }
    });
  }
}
