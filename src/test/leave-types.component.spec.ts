import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LeaveTypesComponent} from '../app/component/leave-types/leave-types.component';
import {ActivatedRoute, provideRouter} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';

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
});