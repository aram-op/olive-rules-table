import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LeaveTypesComponent} from '../app/component/leave-types/leave-types.component';
import {ActivatedRoute, provideRouter, Router} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

const expectedLeaveTypes = [{
  'id': '1',
  'name': 'Annual',
  'validity': 'Limited',
  'status': 'Draft'
},
  {
    'id': '2',
    'name': 'Sick',
    'validity': 'Unlimited',
    'status': 'Active'
  },
  {
    'id': '3',
    'name': 'Maternity',
    'validity': 'Unlimited',
    'status': 'Inactive'
  },
  {
    'id': '4',
    'name': 'Pilgrimage',
    'validity': 'Unlimited',
    'status': 'Draft'
  },
  {
    'id': '5',
    'name': 'Not Paid',
    'validity': 'Unlimited',
    'status': 'Draft'
  }];

describe('LeaveTypesComponent', () => {
  let component: LeaveTypesComponent;
  let fixture: ComponentFixture<LeaveTypesComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveTypesComponent, BrowserAnimationsModule],
      providers: [
        provideRouter([]),
        {provide: ActivatedRoute, useValue: {params: of({ruleId: '1'})}}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('.ngOnInit()', () => {
    beforeEach(() => {
      jest.spyOn(component, 'setData').mockImplementation();

      component.ngOnInit();
    });

    it('should set the ruleId to the id from query params', () => {
      expect(component.ruleId).toEqual('1');
    });

    it('should call the .setData() method', () => {
      expect(component.setData).toHaveBeenCalled();
    });
  });

  describe('.setData()', () => {
    it('should set data to leave types that the rule has', () => {
      expect(component.data).toEqual(expectedLeaveTypes);
    });

    it('should initialize the tableData property', () => {
      expect(component.tableData.length).toBeGreaterThan(0);
    });

    it('should initialize the columnHeadersToDisplay property', () => {
      expect(component.columnHeadersToDisplay.size).toBeGreaterThan(0);
    });
  });

  describe('.onCreateNew', () => {
    let buttonElem: DebugElement;

    beforeEach(() => {
      buttonElem = fixture.debugElement.query(By.css('.create-button'));

      jest.spyOn(component, 'onCreateNew');
      jest.spyOn(router, 'navigate').mockImplementation(() => new Promise(() => {}));

      buttonElem.triggerEventHandler('click');
    });

    test('if it executes when user clicked on "Create New" button', () => {
      expect(component.onCreateNew).toHaveBeenCalled();
    });

    it('should call the .navigate() method of router', () => {
      expect(router.navigate).toHaveBeenCalled();
    });
  });
});
