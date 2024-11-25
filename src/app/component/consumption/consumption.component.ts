import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-consumption',
  standalone: true,
  imports: [
    MatRadioGroup,
    MatRadioButton,
    MatLabel,
    MatFormField,
    MatSelect,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './consumption.component.html',
  styleUrl: './consumption.component.css'
})
export class ConsumptionComponent implements OnInit {
  @Output() formValueChanged = new EventEmitter();
  form = new FormGroup({
    consumptionType: new FormControl(''),
    unusedBalance: new FormControl(''),
    frequencyNumber: new FormControl(1)
  });

  ngOnInit() {
    this.formValueChanged.emit(this.form);

    this.form.valueChanges.subscribe(() => {
      this.formValueChanged.emit(this.form);
    });
  }
}
