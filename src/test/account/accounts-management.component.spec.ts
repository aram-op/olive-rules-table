import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
  AccountsManagementComponent
} from '../../app/pages/accounts-management/accounts-management.component';
import {ActivatedRoute, provideRouter, Router} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

describe('AccountsManagementComponent', () => {
  let component: AccountsManagementComponent;
  let fixture: ComponentFixture<AccountsManagementComponent>;
  let router: Router;

  const mockRoute = {params: of()};
  const expectedColumnHeadersToDisplay: Map<string, string> = new Map();
  expectedColumnHeadersToDisplay.set('id', 'Account ID');
  expectedColumnHeadersToDisplay.set('name', 'Client Name');
  expectedColumnHeadersToDisplay.set('email', 'Email');
  expectedColumnHeadersToDisplay.set('status', 'Status');
  expectedColumnHeadersToDisplay.set('actions', 'Actions');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsManagementComponent, BrowserAnimationsModule],
      providers: [provideRouter([]), {provide: ActivatedRoute, useValue: mockRoute}]

    }).compileComponents();

    fixture = TestBed.createComponent(AccountsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the columnHeadersToDisplay property', () => {
    expect(component.columnHeadersToDisplay).toEqual(expectedColumnHeadersToDisplay);
  });

  it('should initialize the data property', () => {
    expect(component.data.length).toBeGreaterThan(0);
  });

  it('should contain table component and pass the required inputs', () => {
    const tableComponent = fixture.debugElement.query(By.css('app-table'));
    const expectedColumns = ['id', 'name', 'email', 'status', 'actions'];

    expect(tableComponent).toBeTruthy();
    expect(tableComponent.componentInstance.displayedColumns).toEqual(expectedColumns);
    expect(tableComponent.componentInstance.headers).toEqual(expectedColumnHeadersToDisplay);
  });

  describe('.onCreateAccount()', () => {
    beforeEach(() => {
      const createAccountBtn = fixture.debugElement.query(By.css('.create-button'));

      jest.spyOn(component, 'onCreateAccount');
      jest.spyOn(router, 'navigate').mockImplementation(() => new Promise(() => {
      }));

      createAccountBtn.triggerEventHandler('click');
    });

    test('if it is called when the user clicks on Create Account button', () => {
      expect(component.onCreateAccount).toHaveBeenCalled();
    });

    it('should call .navigate() of Router with path "create"', () => {
      expect(router.navigate).toHaveBeenCalledWith(['create'], {relativeTo: mockRoute});
    });
  });

  describe('.onAccountSelected()', () => {
    beforeEach(() => {
      const tableComponentElem = fixture.debugElement.query(By.css('app-table'));

      jest.spyOn(component, 'onAccountSelected');
      jest.spyOn(router, 'navigate').mockImplementation(() => new Promise(() => {
      }));

      tableComponentElem.triggerEventHandler('rowSelected', {id: '123'});
    });

    test('if it is called when the user selects a table row', () => {
      expect(component.onAccountSelected).toHaveBeenCalledWith({id: '123'});
    });

    it('should call .navigate() of Router with received id as path', () => {
      expect(router.navigate).toHaveBeenCalledWith(['123'], {relativeTo: mockRoute});
    });
  });
});
