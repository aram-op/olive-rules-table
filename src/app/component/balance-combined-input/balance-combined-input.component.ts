import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatOption, MatSelect, MatSelectTrigger} from '@angular/material/select';
import {NgClass} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-balance-combined-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatFormField,
    NgClass,
    MatInput,
    MatSelectTrigger
  ],
  templateUrl: './balance-combined-input.component.html',
  styleUrl: './balance-combined-input.component.css'
})
export class BalanceCombinedInputComponent implements OnInit {
  @Input() isDisabled$?: BehaviorSubject<boolean>;
  form = new FormGroup({
    timeOptions: new FormControl('d'),
    amount: new FormControl('')
  });

  ngOnInit() {
    if (!this.isDisabled$) return;

    this.isDisabled$.subscribe((isDisabled) => {
      if (isDisabled) {
        this.form.controls.amount.disable();
        this.form.controls.timeOptions.disable();
      } else {
        this.form.controls.amount.enable();
        this.form.controls.timeOptions.enable();
      }
    })
  }
}
