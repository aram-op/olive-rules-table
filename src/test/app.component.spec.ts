import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from '../app/component/app/app.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('heading element', () => {
    let heading: DebugElement;

    beforeEach(() => {
      heading = fixture.debugElement.query(By.css('h1'));
    });

    it('should be created', () => {
      expect(heading).toBeTruthy();
    });

    it('should contain title "Rules Engine"', () => {
      expect(heading.nativeElement.textContent).toEqual('Rules Engine');
    });
  });

  it('should have table component inside it', () => {
    const tableComponentElem = fixture.debugElement.query(By.css('app-table'));

    expect(tableComponentElem).toBeTruthy();
  });
});
