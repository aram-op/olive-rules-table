import {Component, forwardRef} from '@angular/core';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatOption, MatSelect, MatSelectTrigger} from '@angular/material/select';
import {MatIcon} from '@angular/material/icon';
import {PhoneNumberInput} from '../../component/shared/phone-number/phone-number.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HeadingComponent} from '../../component/shared/heading/heading.component';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatSelect,
    MatOption,
    MatIcon,
    MatSuffix,
    MatSelectTrigger,
    PhoneNumberInput,
    forwardRef(() => PhoneNumberInput),
    ReactiveFormsModule,
    HeadingComponent
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  form: FormGroup;

  /**
   * Will be passed as an input to HeadingComponent.
   * The keys should be the path that will be passed to routerLink.
   * The values should be the heading texts
   */
  headings: Map<string, string>;

  constructor() {
    this.headings = new Map();
    this.headings.set('../', 'Accounts Management');
    this.headings.set('./', 'Create Account');

    this.form = new FormGroup({
      clientName: new FormControl(''),
      email: new FormControl(''),
      contactPersonName: new FormControl(''),
      phoneNumber: new FormControl(''),
      address: new FormControl(''),
      country: new FormControl('jordan'),
      description: new FormControl(''),
    });
  }

  onSubmit() {
    //can't implement yet
  }
}
