import {Component, inject, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {BalanceComponent} from '../balance/balance.component';
import {ConsumptionComponent} from '../consumption/consumption.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Rule} from '../../model/rule.model';
import RULES from '../../../rules.json';

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
    ConsumptionComponent
  ],
  templateUrl: './create-leave-type.component.html',
  styleUrl: './create-leave-type.component.css'
})
export class CreateLeaveTypeComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  isBalanceDisplayed = false;
  isConsumptionDisplayed = false;
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
    unit: new FormControl(''),
    gender: new FormControl(''),
    employmentType: new FormControl(''),
    balance: new FormGroup({})
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
    });
  }

  onSubmit() {
  }

  onCancel() {
    this.router.navigate([`rules/${this.rule?.id}/leave-types`]);
  }
}
