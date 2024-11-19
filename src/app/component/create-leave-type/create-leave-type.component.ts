import {Component, inject, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput, MatSuffix} from '@angular/material/input';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {BalanceComponent} from '../balance/balance.component';
import {ConsumptionComponent} from '../consumption/consumption.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Rule} from '../../model/rule.model';
import RULES from '../../../rules.json';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDatepickerToggleIcon
} from '@angular/material/datepicker';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-create-leave-type',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatRadioGroup,
    MatRadioButton,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
    ReactiveFormsModule,
    BalanceComponent,
    ConsumptionComponent,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    MatIcon,
    MatSuffix,
    MatDatepickerToggleIcon
  ],
  templateUrl: './create-leave-type.component.html',
  styleUrl: './create-leave-type.component.css'
})
export class CreateLeaveTypeComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  isBalanceDisplayed = false;
  isConsumptionDisplayed = false;
  isDateRangeDisplayed = false;
  isThroughBalance = true;
  rule?: Rule;

  form = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    entitled: new FormControl(''),
    docsRequired: new FormControl(''),
    gracePeriod: new FormControl(''),
    dispute: new FormControl(''),
    validity: new FormControl(''),
    validityFrom: new FormControl(new Date()),
    validityTo: new FormControl(new Date()),
    unit: new FormControl(''),
    gender: new FormControl(''),
    employmentType: new FormControl(''),
    balance: new FormGroup({}),
    consumption: new FormGroup({})
  });

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['ruleId'];

      if (id) {
        this.rule = RULES.find((rule) => rule.id === id);
      }
    });

    this.form.valueChanges.subscribe((values) => {
      if (values.entitled === 'through-balance') {
        this.isBalanceDisplayed = true;
        this.isThroughBalance = true;
        this.isConsumptionDisplayed = true;
      } else if (values.entitled === 'event-based') {
        this.isBalanceDisplayed = true;
        this.isThroughBalance = false;
        this.isConsumptionDisplayed = false;
      }

      if (values.validity === 'limited') {
        this.isDateRangeDisplayed = true;
      } else {
        this.isDateRangeDisplayed = false;
      }

      if (values.type === 'not-paid') {
        this.form.controls.entitled.disable({emitEvent: false});
        this.form.controls.entitled.setValue('');
        this.isBalanceDisplayed = false;
        this.isConsumptionDisplayed = false;
      } else {
        this.form.controls.entitled.enable({emitEvent: false});
      }
    });
  }

  onSubmit() {
    //can't implement yet
  }

  onCancel() {
    this.router.navigate([`rules/${this.rule?.id}/leave-types`]).then(() => window.location.reload());
  }

  setBalanceForm(balanceForm: FormGroup) {
    this.form.controls.balance = balanceForm;
  }

  setConsumptionForm(consumptionForm: FormGroup) {
    this.form.controls.consumption = consumptionForm;
  }
}
