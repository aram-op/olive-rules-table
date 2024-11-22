import { ComponentFixture, TestBed } from '@angular/core/testing';
import {PhoneNumberInput} from '../app/component/shared/phone-number/phone-number.component';

describe('PhoneNumberComponent', () => {
  let component: PhoneNumberInput;
  let fixture: ComponentFixture<PhoneNumberInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneNumberInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneNumberInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
