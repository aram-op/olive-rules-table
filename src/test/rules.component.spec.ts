import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RulesComponent} from '../app/component/rules/rules.component';
import {provideRouter, Router} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import RULES from '../rules.json';
import {By} from '@angular/platform-browser';
import spyOn = jest.spyOn;

describe('RulesComponent', () => {
  let component: RulesComponent;
  let fixture: ComponentFixture<RulesComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesComponent, BrowserAnimationsModule],
      providers: [
        provideRouter([]),
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(RulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the table data ', () => {
    expect(component.data.length).toBeGreaterThan(0);
  });

  it('should contain heading with text "Rules Engine"', () => {
    const headingElem = fixture.debugElement.query(By.css('h1'));

    expect(headingElem).toBeTruthy();
    expect(headingElem.nativeElement.textContent).toEqual('Rules Engine');
  });

  it('should contain table component element', () => {
    const tableCompElem = fixture.debugElement.query(By.css('app-table'));

    expect(tableCompElem).toBeTruthy();
  });

  describe('.navigateToLeavesPage()', () => {

    test('if it invokes when rowSelected event occurred on table component', () => {
      const tableCompElem = fixture.debugElement.query(By.css('app-table'));

      jest.spyOn(component, 'navigateToLeavesPage').mockImplementation();

      tableCompElem.triggerEventHandler('rowSelected');

      expect(component.navigateToLeavesPage).toHaveBeenCalled();
    });

    it('should use .navigate() of Router to navigate to leave types page', () => {
      jest.spyOn(router, 'navigate').mockImplementation().mockReturnValue(new Promise(() => {}));

      component.navigateToLeavesPage({id: 1, model: {module: 'Leaves'}});

      expect(router.navigate).toHaveBeenCalledWith(['rules/1/leave-types']);
    });
  });
});
