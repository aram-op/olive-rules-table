import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountComponent} from '../../app/pages/account/account.component';
import {ActivatedRoute, provideRouter} from '@angular/router';
import {of} from 'rxjs';
import {Account} from '../../app/model/account.model';
import {By} from '@angular/platform-browser';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  const mockRoute = {params: of({accountId: '1287443'})};
  const expectedHeadings: Map<string, string> = new Map();
  expectedHeadings.set('../', 'Accounts Management');
  expectedHeadings.set('./', 'Aram Tadevosyan');

  const expectedAccount: Account = {
    id: '1287443',
    clientName: 'Aram Tadevosyan',
    email: 'dummyEmail@example.com',
    status: 'active',
    country: 'Armenia',
    creationDate: '11/21/2024',
    logoUrl: 'assets/logo.jpg',
    contactPersonName: 'Lorem Ipsum',
    phoneNumber: '+962788888888',
    address: 'Amman - Abdoun - Street 4',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    moduleIds: ['1', '2', '3', '4']
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountComponent],
      providers: [provideRouter([]), {provide: ActivatedRoute, useValue: mockRoute}]

    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the headings property', () => {
    expect(component.headings).toEqual(expectedHeadings);
  });

  it('should contain heading component with headings passed as input', () => {
    const headingComponent = fixture.debugElement.query(By.css('app-heading'));

    expect(headingComponent).toBeTruthy();
    expect(headingComponent.componentInstance.headings).toEqual(expectedHeadings);
  });

  it('should initialize the account property', () => {
    expect(component.account).toEqual(expectedAccount);
  });

  it('should initialize the modules property', () => {
    expect(component.modules.length).toEqual(4);
  });
});
