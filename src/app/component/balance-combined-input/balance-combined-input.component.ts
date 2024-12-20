import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatOption, MatSelect, MatSelectTrigger} from '@angular/material/select';
import {NgClass} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {BehaviorSubject} from 'rxjs';

/**
 * Custom component for a balance field that has both matInput and matSelect inside it.
 * It is a FormGroup. On every value change the FormGroup will be emitted with the event.
 * When using this, make sure to have a child formGroup with matching controls inside your formGroup.
 */
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
  @Output() formValueChanged: EventEmitter<FormGroup> = new EventEmitter();
  @Input() isDisabled$?: BehaviorSubject<boolean>;
  form = new FormGroup({
    timeOptions: new FormControl('d'),
    amount: new FormControl('')
  });

  ngOnInit() {
    this.formValueChanged.emit(this.form);

    this.form.valueChanges.subscribe(() => {
      this.formValueChanged.emit(this.form);
    });

    if (this.isDisabled$) {
      this.isDisabled$.subscribe((isDisabled) => {
        if (isDisabled) {
          this.form.controls.amount.disable();
          this.form.controls.timeOptions.disable();
        } else {
          this.form.controls.amount.enable();
          this.form.controls.timeOptions.enable();
        }
      });
    }
  }
}
